import React from "react";
import * as d3 from "d3";

class Chart1 extends React.Component {
  constructor() {
    super();
    this.draw = this.draw.bind();
  }
  myRef = React.createRef();
  componentDidMount() {
    this.draw();
  }
  draw() {
    const dataSet = [
      { url: "www.a.com", count: 2321 },
      { url: "www.b.com", count: 1721 },
      { url: "www.c.com", count: 6331 },
      { url: "www.d.com", count: 5321 },
      { url: "www.e.com", count: 3321 },
      { url: "www.f.com", count: 921 },
      { url: "www.g.com", count: 2399 },
      { url: "www.h.com", count: 9653 },
      { url: "www.i.com", count: 6018 },
      { url: "www.j.com", count: 5374 }
    ];
    const barWidth = 5;
    const barColor = "blue";
    const width = 800;
    const height = 400;
    const maxMin = {
      minX: 0,
      maxX: width,
      minY: 0,
      maxY: d3.max(dataSet, data => data.count)
    };
    const yScale = d3
      .scaleLinear()
      .domain([maxMin.minY, maxMin.maxY])
      .range([0, height]);
    var chart = d3
      .select("#graph")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "gray");

    var layer1 = chart.append("g");
    layer1
      .selectAll("rect")
      .data(dataSet)
      .enter()
      .append("rect")
      .style("fill", barColor)
      .attr("x", (data, index) => {
        return index * (width / dataSet.length);
      })
      .attr("y", (data, index) => height - yScale(data.count))
      .attr("width", (data, index) => {
        return width / dataSet.length - barWidth;
      })
      .attr("height", (data, index) => {
        return yScale(data.count);
      })
      .on("mouseover", (data, index) => {
        d3.select(this)
          .transition()
          .duration(300)
          .style("fill", "yellow");
      })
      .on("mouseout", (data, index) => {
        d3.select(this)
          .transition()
          .duration(300)
          .style("fill", "blue");
      });
  }
  render() {
    return <p id="graph" className="d-flex justify-content-center"></p>;
  }
}

export default Chart1;
