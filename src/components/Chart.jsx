import jstat from "jStat";
import React from "react";
import Plot from "react-plotly.js";

const Chart = ({ data, LSL, USL, referenceValue, column }) => {
  const tolerance = Math.abs(USL - LSL);
  const startRange = Math.min(
    ...data,
    isNaN(LSL) ? data[0] : LSL,
    isNaN(USL) ? data[0] : USL,
    isNaN(referenceValue) ? data[0] : referenceValue
  );
  const endRange = Math.max(
    ...data,
    isNaN(LSL) ? data[0] : LSL,
    isNaN(USL) ? data[0] : USL,
    isNaN(referenceValue) ? data[0] : referenceValue
  );

  return (
    <div>
      <Plot
        data={[
          {
            x: data.map((v, i) => i + 1),
            y: data.map((v, i) => v),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "#1f77b4" },
          },
          {
            x: [1, data.length],
            y: [jstat.mean(data), jstat.mean(data)],
            mode: "lines",
            marker: { color: "green" },
          },
          {
            x: [1, data.length],
            y: [
              Number(referenceValue) + 0.1 * tolerance,
              Number(referenceValue) + 0.1 * tolerance,
            ],
            mode: "lines",
            marker: { color: "red" },
          },
          {
            x: [1, data.length],
            y: [
              Number(referenceValue) - 0.1 * tolerance,
              Number(referenceValue) - 0.1 * tolerance,
            ],
            mode: "lines",
            marker: { color: "red" },
          },
        ]}
        layout={{
          width: 660,
          height: 400,
          autosize: false,
          xaxis: {
            title: "Values",
            zeroline: false,
          },
          yaxis: {
            title: column,
            showticklabels: true,
            range: [
              startRange - startRange * 0.01,
              endRange + startRange * 0.01,
            ],
            zeroline: false,
          },
          showlegend: false,
        }}
      />
    </div>
  );
};

export default Chart;
