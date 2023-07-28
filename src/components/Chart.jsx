import React from "react";
import Plot from "react-plotly.js";

const Chart = ({ data, LSL, USL, referenceValue }) => {
  const tolerance = 0.1 * 11.45;
  console.log(Number(referenceValue) - tolerance);
  console.log(Number(referenceValue) + tolerance);
  return (
    <div>
      <Plot
        data={[
          {
            x: data.map((v, i) => i + 1),
            y: data.map((v, i) => v),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
          {
            x: [0, data.length],
            y: [referenceValue, referenceValue],
            mode: "lines",
            marker: { color: "green" },
          },
          // {
          //   x: [0, data.length],
          //   y: [
          //     referenceValue - 0.1 * tolerance,
          //     referenceValue - 0.1 * tolerance,
          //   ],
          //   mode: "lines",
          // },
          // {
          //   x: [0, data.length],
          //   y: [referenceValue + tolerance, referenceValue tolerance],
          //   mode: "lines",
          // },
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
            title: "Probability",

            zeroline: false,
          },
          showlegend: false,
        }}
      />
    </div>
  );
};

export default Chart;
