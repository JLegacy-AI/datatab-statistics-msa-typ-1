import React from "react";
import Plot from "react-plotly.js";
import { curves, generateFrequencyData } from "../utils/utils";
import { calculateNormalDistributionCurveData } from "../utils/statistics";
import jStat from "jStat";

const HistogramChart = ({
  data,
  xmin = 0,
  xmax = undefined,
  bin = 5,
  curve = "none",
  LSL,
  USL,
}) => {
  const result = generateFrequencyData(
    data,
    bin,
    isNaN(xmin) ? Math.min(...data) : xmin,
    isNaN(xmax) ? Math.max(...data) : xmax
  );

  function normalizeProbabilities(probabilities) {
    // Calculate the sum of probabilities
    const totalSum = probabilities.reduce((sum, p) => sum + p, 0);

    // Check if sum is already 1 (no adjustment needed)
    if (totalSum === 1) {
      return probabilities;
    }

    const numProbabilities = probabilities.length;

    // Adjust the probabilities
    if (totalSum < 1) {
      const remainingDifference = 1 - totalSum;
      let countBins = numProbabilities;
      const adjustment = remainingDifference / countBins;

      probabilities = probabilities.map((p) => p + adjustment);
    } else {
      const scalingFactor = 1 / totalSum;
      probabilities = probabilities.map((p) => p * scalingFactor);
    }

    return probabilities;
  }

  if (curve === "normal") {
    if (result.length > 0) {
      let total = result.reduce((acc, val) => acc + val[1], 0);
      result.forEach((entry) => {
        entry[1] = Number(entry[1] / total);
        entry[0] = entry[0];
      });
    }

    const normalCurveData = calculateNormalDistributionCurveData(data);

    const labels = (result) => {
      const labels = [];

      const normalizedProbabilities = normalizeProbabilities(
        result.map((v, i) => +v[1])
      ).map((v) => Number(v.toFixed(8)));

      for (let i = 0; i < result.length; i++) {
        labels.push(
          `Start:${isNaN(result[i][2]) ? "" : result[i][2].toFixed(2)} End:${
            isNaN(result[i][3]) ? "" : result[i][3].toFixed(2)
          } Probability:${normalizedProbabilities[i]}`
        );
        result[i] = [result[i][0], result[i][1]];
      }

      return labels;
    };

    const label = labels(result);

    // Extract x and y values from result
    const xValues = result.map((entry) => entry[0]);
    const yValues = result.map((entry) => entry[1] / (xValues[1] - xValues[0]));

    // Define the data trace for the bar chart
    const barTrace = {
      x: xValues,
      y: yValues,
      type: "bar",
      hovertemplate: label,
      name: "Probability",
      marker: {
        line: {
          color: "black",
          width: 1,
        },
      },
    };

    // Define the data trace for the line chart
    const lineTrace = {
      x: bin == 0 ? [] : normalCurveData.map((x) => x[0]),
      y: bin == 0 ? [] : normalCurveData.map((x) => x[1]),
      mode: "lines",
      type: "line",
      name: "Normal Distribution",
      xref: "paper",
      line: {
        shape: "spline",
        smoothing: 1.3,
        dash: "solid",
      },
    };

    // Define the reference line trace
    const referenceLine = {
      x: [LSL, LSL],
      y: [
        0,
        Math.max(
          Math.max(...normalCurveData.map((x) => x[1])),
          Math.max(...yValues)
        ),
      ],
      name: "LSL",
      type: "line",
      xref: "paper",
      line: {
        width: 2,
        color: "red",
        dash: "dashdot",
      },
    };

    const USLLine = {
      x: [USL, USL],
      y: [
        0,
        Math.max(
          Math.max(...normalCurveData.map((x) => x[1])),
          Math.max(...yValues)
        ),
      ],
      name: "USL",
      type: "line",
      line: {
        width: 2,
        color: "red",
        dash: "dashdot",
      },
    };

    // Combine the traces into a single array
    const graphData = [barTrace, referenceLine, lineTrace, USLLine];

    // Define the layout for the chart
    const layout = {
      width: 560,
      height: 400,
      autosize: false,
      xaxis: {
        title: "Values",
      },
      yaxis: {
        title: "Probability",
      },
      bargap: 0,
      showlegend: false,
    };

    return <Plot data={graphData} layout={layout} />;
  } else {
    const labels = [];
    for (let i = 0; i < result.length; i++) {
      labels.push(`Fequency:${result[i][1]} of ${result[i][0]}`);
    }
    return (
      <Plot
        data={[
          {
            name: "Frequency",
            x: result.map((entry) => entry[0]),
            y: result.map((entry) => entry[1]),
            type: "bar",
            hovertemplate: labels,
          },
        ]}
        layout={{
          width: 560,
          height: 400,
          autosize: false,
          xaxis: {
            title: "Values",
          },
          yaxis: {
            title: "Frequency",
          },
          hoverlabel: true,
          bargap: 0,
          showlegend: false,
        }}
      />
    );
  }
};

export default HistogramChart;
