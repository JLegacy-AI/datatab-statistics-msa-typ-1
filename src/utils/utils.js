import jState from "jStat";

const curves = (data) => {
  let stdDev = jState.stdev(data);
  const mean = jState.mean(data);
  // Calculate the z-scores for the measured data
  const zScores = data.map((value) => (value - mean) / stdDev);
  // Sort the z-scores in ascending order
  const sortedZScores = zScores.slice().sort((a, b) => a - b);
  // Calculate the quanles for the sorted z-scores
  const quanles = sortedZScores.map(
    (value, index) => (index + 1) / (sortedZScores.length + 1)
  );
  // Calculate the corresponding quanles for the standard normal distribuon
  const standardQuanles = quanles.map((quanle) =>
    jState.normal.inv(quanle, 0, 1)
  );
  // Calculate the best fit line for the normal distribuon
  const bestFitLine = jState.linearRegression(standardQuanles, sortedZScores);
  // Calculate the confidence interval curves for the best fit line
  const confidenceIntervalCurves = quanles.map((quanle) => {
    const z = jState.normal.inv(quanle, 0, 1);
    const confidenceInterval = jState.normal.ci(z, bestFitLine);
    return {
      quanle: quanle,
      lower: confidenceInterval.lower,
      upper: confidenceInterval.upper,
    };
  });
};

function createFrequencyChart(numbers, bins, min, max) {
  if (max === undefined) {
    min = Math.min(...numbers);
    max = Math.max(...numbers);
  } else {
    if (min > max && min === "Infinity") {
      return [];
    }
  }

  if (typeof bins === "string" && bins === "") bins = 0;
  else if (!isNaN(bins)) bins = parseFloat(bins);

  if (min == "") min = Math.min(...numbers);
  if (max == "") max = Math.max(...numbers);

  if (typeof min == "string") min = Number(min);
  if (typeof max == "string") max = Number(max);
  const prev = max;
  min = Math.floor(min);
  max = Math.ceil(max) < max ? max : Math.ceil(max) - 0.01;
  let binWidth = (max - min) / bins;

  const frequencies = Array(bins).fill(0);

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];

    if (number >= min && number <= max) {
      const binIndex = Math.floor((number - min) / binWidth);

      frequencies[binIndex]++;
    }
  }

  let cordinates = [];
  if (!isNaN(binWidth)) binWidth = parseFloat(binWidth);
  for (let i = 0; i < bins; i++) {
    let binStart = min + i * binWidth;
    if (!isNaN(binStart)) binStart = parseFloat(binStart);
    let binEnd = binStart + binWidth;
    if (!isNaN(binEnd)) binEnd = parseFloat(binEnd);
    const binLabel = (binEnd + binStart) / 2;

    cordinates.push([binLabel, frequencies[i], binStart, binEnd]);
  }

  return cordinates;
}

function countStringFrequency(data) {
  const frequencyMap = {};

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    if (item !== null && item.trim() === "") continue;
    if (frequencyMap.hasOwnProperty(item)) {
      frequencyMap[item]++;
    } else {
      frequencyMap[item] = 1;
    }
  }

  const feq = Object.keys(frequencyMap).map((v, i) => [
    v,
    Object.values(frequencyMap)[i],
  ]);
  return feq;
}

function generateFrequencyData(data, bins, min, max) {
  if (Array.isArray(data)) {
    if (typeof data[0] === "string") {
      return countStringFrequency(data);
    } else if (typeof data[0] === "number") {
      return createFrequencyChart(data, bins, min, max);
    }
  }

  return {};
}

const convertToArray = (data, column) => {
  let array = [];
  for (let i = 1; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (j === column && data[i][j] !== "" && data[i][j] !== null) {
        if (!isNaN(data[i][j])) {
          array.push(Number(data[i][j]));
        } else {
          array.push(data[i][j]);
        }
      }
    }
  }
  return array;
};

const createInitialData = (data, rows, columns) => {
  const initialData = [];
  if (data.length < rows - 5)
    for (let i = 0; i < rows; i++) {
      const row = [];
      if (i < data.length) {
        row.push(...data[i]);
        row.push(
          ...Array.from(
            {
              length:
                data[i].length < columns - 5 ? columns - data[i].length : 5,
            },
            () => ""
          )
        );
      }
      row.push(...Array.from({ length: columns }, () => ""));
      initialData.push(row);
    }
  else {
    for (let i = 0; i < data.length; i++) {
      const row = [];
      if (i < data.length) {
        row.push(...data[i]);
        row.push(
          ...Array.from(
            {
              length:
                data[i].length < columns - 5 ? columns - data[i].length : 5,
            },
            () => ""
          )
        );
      }
      row.push(...Array.from({ length: columns }, () => ""));
      initialData.push(row);
    }

    for (let i = 0; i < 5; i++) {
      initialData.push(Array.from({ length: data[0].length }, () => ""));
    }
  }

  return initialData;
};

function generateNormalDistributionCurve(dataPoints, numStdDeviations) {
  const mean = jState.mean(dataPoints);
  const stdDeviation = jState.stdev(dataPoints);
  const curve = [];

  for (let i = 0; i < dataPoints.length; i++) {
    const x = dataPoints[i];
    const y = mean + numStdDeviations * stdDeviation;
    curve.push([x, y]);
  }

  return curve;
}

export {
  createFrequencyChart,
  countStringFrequency,
  generateFrequencyData,
  convertToArray,
  createInitialData,
  generateNormalDistributionCurve,
  curves,
};
