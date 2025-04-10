"use client";

import { UserWithReferral } from "@/app/api/getUserReferrals/route";
import { useMediaQuery } from "@react-hook/media-query";
import {
  hierarchy,
  HierarchyPointNode,
  linkHorizontal,
  select,
  tree,
} from "d3";
import { useEffect, useRef } from "react";

interface D3Node extends HierarchyPointNode<UserWithReferral> {
  x0: number;
  y0: number;
  _children?: D3Node[];
}

type TreeChartProps = {
  data: UserWithReferral;
};
export const TreeChart = ({ data }: TreeChartProps) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");

  const width = isMobile ? 500 : 1000;
  const marginTop = 10;
  const marginRight = 0;
  const marginBottom = 10;
  const marginLeft = 40;

  useEffect(() => {
    select(ref.current).selectAll("*").remove();

    // create the svg container
    const svg = select(ref.current);

    const root = hierarchy<UserWithReferral>(data) as D3Node;
    const dx = 15;
    const dy = (width - marginRight - marginLeft) / (1 + root.height);

    const treeLayout = tree<UserWithReferral>().nodeSize([dx, dy]);
    const diagonal = linkHorizontal<
      {
        source: HierarchyPointNode<UserWithReferral>;
        target: HierarchyPointNode<UserWithReferral>;
      },
      HierarchyPointNode<UserWithReferral>
    >()
      .x((d) => d.y)
      .y((d) => d.x);

    svg.attr(
      "style",
      "max-width: 100%; height: 100%; font: 10px sans-serif; user-select: none;"
    );

    const gLink = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);

    const gNode = svg
      .append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all");

    function update(event: any, source: D3Node) {
      const duration = event?.altKey ? 2500 : 250; // hold the alt key to slow down the transition
      const nodes = root.descendants().reverse();
      const links = root.links();

      // Compute the new tree layout.
      treeLayout(root);

      let left = root;
      let right = root;
      root.eachBefore((node) => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
      });

      const height = right.x - left.x + marginTop + marginBottom;

      const transition: any = svg
        .transition()
        .duration(duration)
        .attr("height", height)
        .attr(
          "viewBox",
          [-marginLeft, left.x - marginTop, width, height].toString()
        );

      // Update the nodes…
      const node = gNode
        .selectAll<SVGGElement, D3Node>("g")
        .data(nodes, (d: any) => d.id);

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node
        .enter()
        .append("g")
        .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event, d: any) => {
          d.children = d.children ? null : d._children;
          update(event, d);
        });

      nodeEnter
        .append("circle")
        .attr("r", 4)
        .attr("fill", (d: any) => {
          return d._children
            ? d.data.index !== 0
              ? "#8a5ffc"
              : "#1c223b"
            : "#999";
        });

      nodeEnter
        .append("text")
        .attr("dy", "0.31em")
        .attr("x", (d: any) => (d._children ? -6 : 6))
        .attr("text-anchor", (d: any) => (d._children ? "end" : "start"))
        .attr("font-size", "1.1em")
        .text((d: any) => {
          return d.data.name == "empty"
            ? "empty"
            : d.data.index == 1
            ? d.data.index + "(me)"
            : d.data.index;
        })
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "white")
        .attr("paint-order", "stroke");

      // Transition nodes to their new position.
      node
        .merge(nodeEnter)
        .transition(transition)
        .attr("transform", (d: any) => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      node
        .exit()
        .transition(transition)
        .remove()
        .attr("transform", (d: any) => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

      const link: any = gLink
        .selectAll("path")
        .data(links, (d: any) => d.target.id);

      const linkEnter = link
        .enter()
        .append("path")
        .attr("d", (d: any) => {
          const o = { x: source.x0, y: source.y0 };
          //@ts-ignore
          return diagonal({ source: o, target: o });
        });

      link.merge(linkEnter).transition(transition).attr("d", diagonal);

      link
        .exit()
        .transition(transition)
        .remove()
        .attr("d", (d: any) => {
          const o = { x: source.x, y: source.y };
          //@ts-ignore
          return diagonal({ source: o, target: o });
        });

      root.eachBefore((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d: any, i: any) => {
      d.id = i;
      d._children = d.children;
      if (d.data.name == "empty") d.children = null;
    });
    update(null, root);
  }, [isMobile, width, data]);

  return <svg ref={ref} className="mx-auto py-4"></svg>;
};
