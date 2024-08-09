"use client";

import { hierarchy, linkHorizontal, select, tree } from "d3";
import { useEffect, useRef } from "react";

export const TreeChart = ({ data }: any) => {
  const ref = useRef<SVGSVGElement | null>(null);

  // const width = document.body.clientWidth;
  const height = 750;
  // const height = 1400;
  const width = 700;
  const marginTop = 10;
  const marginRight = 10;
  const marginBottom = 10;
  const marginLeft = 40;
  useEffect(() => {
    select(ref.current).selectAll("*").remove();

    // create the svg container
    const svg = select(ref.current);

    const root = hierarchy(data);

    const margin = { top: 0, right: 50, left: 20, bottom: 0 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const treeLayout = tree().size([innerHeight, innerWidth]);

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // svg.call(zoom().on("zoom", () => {
    //   g.attr("transform", )
    // }))

    const links = treeLayout(root).links();
    const linkPathGenerator = linkHorizontal<unknown, any>()
      .x((d) => d.y)
      .y((d) => d.x);

    g.selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("d", linkPathGenerator);

    g.selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
      .attr("x", (d: any) => d.y)
      .attr("y", (d: any) => d.x)
      .attr("dy", "0.32em")
      .attr("text-anchor", (d) => (d.children ? "middle" : "start"))
      .attr("font-size", (d) => (d.depth > 2 ? 3.2 - d.depth + "em" : "1em"))
      .text((d) => d.data.data.id);
  }, [height, width, data]);

  return <svg className="mx-auto" ref={ref}></svg>;
};
