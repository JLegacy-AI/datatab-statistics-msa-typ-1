import jstat from "jStat";
import React from "react";
import Plot from "react-plotly.js";

const Chart = ({ data, LSL, USL, referenceValue, column }) => {
  const tolerance = Math.abs(USL - LSL);
  const mean = jstat.mean(data);
  return (
    <div>
      <Plot
        data={[
          {
            name: "Values",
            x: data.map((v, i) => i + 1),
            y: data.map((v, i) => v),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "#1f77b4" },
          },
          {
            name: "Mean",
            x: [1, data.length],
            y: [mean, mean],
            mode: "lines",
            line: {
              dash: "dot",
            },
            marker: { color: "blue" },
          },
          {
            name: "ref",
            x: [1, data.length],
            y: [referenceValue, referenceValue],
            mode: "lines",
            line: {
              dash: "dot",
            },
            marker: { color: "red" },
          },
          {
            name: "ref + 0.1 * Tol",
            x: [1, data.length],
            y: [mean + 0.1 * tolerance, mean + 0.1 * tolerance],
            mode: "lines",
            marker: { color: "red" },
          },
          {
            name: "ref - 0.1 * Tol",
            x: [1, data.length],
            y: [mean - 0.1 * tolerance, mean - 0.1 * tolerance],
            mode: "lines",
            marker: { color: "red" },
          },
        ]}
        layout={{
          width: 660,
          height: 400,
          autosize: false,
          xaxis: {
            title: "Beobachtung",
            zeroline: false,
          },
          yaxis: {
            title: column,
            showticklabels: true,
            zeroline: false,
          },
          showlegend: true,
          legend: {
            xanchor: "center",
            x: 0.5,
            y: 1.2,
            orientation: "h",
          },
        }}
      />
    </div>
  );
};

export default Chart;
