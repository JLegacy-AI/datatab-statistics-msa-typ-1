import React from "react";
import Plot from "react-plotly.js";
import { calculatePercentiles, NormSInv } from "../utils/statistics";
import jStat from "jStat";
import { convertRange } from "../utils/statistics";
import { linearRegression, linearRegressionLine } from "simple-statistics";

const NormalProbabilityPlot = ({ data }) => {
  const percentiles = calculatePercentiles(data); //Return Values as [x, percentile]
  const x = percentiles.map((v) => v[0]);
  const y = percentiles.map((v) => v[1]); //Percentile as Y

  const theoreticalQuantiles = y.map((v) =>
    NormSInv(v, jStat.mean(x), jStat.stdev(x))
  );

  const orderedQuantiles = x.map((v) =>
    jStat.zscore(v, jStat.mean(data), jStat.stdev(data))
  );

  const linearRegressionData = linearRegression(
    theoreticalQuantiles.map((v, i) => [v, orderedQuantiles[i]])
  );
  const predictionLine = theoreticalQuantiles.map((v) =>
    linearRegressionLine(linearRegressionData)(v)
  );

  function DEVSQ(data) {
    const mean = jStat.mean(data);

    const sumOfSquares = data.reduce(
      (acc, value) => acc + Math.pow(value - mean, 2),
      0
    );

    return sumOfSquares;
  }

  function calculateSTEYX(knownY, knownX) {
    if (knownY.length !== knownX.length || knownY.length < 2) {
      throw new Error(
        "Input arrays must have the same length and at least 2 elements."
      );
    }

    const n = knownY.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;
    let sumY2 = 0;

    for (let i = 0; i < n; i++) {
      sumX += knownX[i];
      sumY += knownY[i];
      sumXY += knownX[i] * knownY[i];
      sumX2 += knownX[i] ** 2;
      sumY2 += knownY[i] ** 2;
    }

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt(
      (n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2)
    );

    if (denominator === 0) {
      throw new Error("The denominator is zero. Cannot calculate STEYX.");
    }

    return numerator / (n - 2);
  }

  const Xmean = jStat.mean(theoreticalQuantiles);
  const SSxx = DEVSQ(theoreticalQuantiles);
  const talpha = jStat.studentt.inv((1 - 0.05) / 2, data.length - 2);
  const standardError = calculateSTEYX(predictionLine, theoreticalQuantiles);
  const lower = theoreticalQuantiles.map((v, i) => {
    return (
      predictionLine[i] +
      talpha *
        standardError *
        Math.sqrt(
          1 / theoreticalQuantiles.length + Math.pow(v - Xmean, 2) / SSxx
        )
    );
  });

  const upper = theoreticalQuantiles.map((v, i) => {
    return (
      predictionLine[i] -
      talpha *
        standardError *
        Math.sqrt(
          1 / theoreticalQuantiles.length + Math.pow(v - Xmean, 2) / SSxx
        )
    );
  });

  return (
    <Plot
      data={[
        {
          x: theoreticalQuantiles,
          y: orderedQuantiles,
          type: "scatter",
          mode: "markers",
          marker: {
            symbol: "cross",
            size: 6,
          },
        },
        {
          x: theoreticalQuantiles,
          y: predictionLine,
          type: "scatter",
          mode: "line",
          marker: {
            symbol: "cross",
            size: 6,
            color: "green",
          },
        },
        {
          x: theoreticalQuantiles,
          y: lower,
          type: "scatter",
          mode: "line",
          line: {
            dash: "dot",
            size: 2,
            color: "red",
          },
        },
        {
          x: theoreticalQuantiles,
          y: upper,
          type: "scatter",
          mode: "line",
          line: {
            dash: "dot",
            size: 2,
            color: "red",
          },
        },
      ]}
      layout={{
        width: 560,
        height: 400,
        autosize: false,
        grid: {
          ygap: 0.3,
        },
        xaxis: {
          title: "Theoretical Quantiles",
          zeroline: false,
        },
        yaxis: {
          title: "Ordered Quantiles",
          zeroline: false,
        },
        showlegend: false,
      }}
    />
  );
};

export default NormalProbabilityPlot;
