"use client";

import { linkHorizontal, zoom, hierarchy, select, tree } from "d3";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "@react-hook/media-query";

export const TreeChart = ({ data }: any) => {
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

    const root: any = hierarchy(data);
    const dx = 15;
    const dy = (width - marginRight - marginLeft) / (1 + root.height);

    const treeLayout = tree().nodeSize([dx, dy]);
    const diagonal: any = linkHorizontal()
      .x((d: any) => d.y)
      .y((d: any) => d.x);

    svg
      // .attr("width", width)
      // .attr("height", dx)
      // .attr("viewBox", [0, 0, 0, 0])
      // .attr("viewBox", [-marginLeft, -marginTop, width, dx])
      .attr(
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

    console.log("resize", window.ResizeObserver);

    function update(event: any, source: any) {
      const duration = event?.altKey ? 2500 : 250; // hold the alt key to slow down the transition
      const nodes = root.descendants().reverse();
      const links = root.links();

      // Compute the new tree layout.
      treeLayout(root);

      let left: any = root;
      let right: any = root;
      root.eachBefore((node: any) => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
      });

      const height = right.x - left.x + marginTop + marginBottom;

      const transition = svg
        .transition()
        .duration(duration)
        .attr("height", height)
        // .attr("width", width)
        .attr(
          "viewBox",
          [-marginLeft, left.x - marginTop, width, height].toString()
          // [-marginLeft, left.x - marginTop, width, height].toString()
        );
      // .tween(
      //   "resize",
      //   //@ts-ignore
      //   window.ResizeObserver ? null : () => (t) => svg.dispatch("toggle")
      // );

      // Update the nodes…
      const node: any = gNode.selectAll("g").data(nodes, (d: any) => d.id);

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node
        .enter()
        .append("g")
        .attr("transform", (d: any) => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event: any, d: any) => {
          d.children = d.children ? null : d._children;
          update(event, d);
        });

      nodeEnter
        .append("circle")
        .attr("r", 4)
        .attr("fill", (d: any) => (d._children ? "#555" : "#999"));
      // .attr("stroke-width", 10);

      nodeEnter
        .append("text")
        .attr("dy", "0.31em")
        .attr("x", (d: any) => (d._children ? -6 : 6))
        .attr("text-anchor", (d: any) => (d._children ? "end" : "start"))
        .attr("font-size", "1.1em")
        .text((d: any) => {
          // console.log("NAME", d);
          return "1000";
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
          return diagonal({ source: o, target: o });
        });

      link.merge(linkEnter).transition(transition).attr("d", diagonal);

      link
        .exit()
        .transition(transition)
        .remove()
        .attr("d", (d: any) => {
          const o = { x: source.x, y: source.y };
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
      // if (d.depth && d.data.data.id.length !== 7) d.children = null;
    });
    update(null, root);
  }, [isMobile, width, data]);

  return (
    <div>
      <svg ref={ref} className="mx-auto"></svg>
      <div>what is this</div>
    </div>
  );
};
