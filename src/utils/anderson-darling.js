import jStat from "jStat";

// Anderson-Darling Test
export function andersonDarlingTest(data) {
  const sortedData = data.slice().sort((a, b) => a - b);
  const mean = jStat.mean(sortedData);
  const stdDev = Math.sqrt(
    sortedData.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      (sortedData.length - 1)
  );

  const normalDistFi = sortedData.map((v, i) =>
    jStat.normal.cdf(v, mean, stdDev)
  );

  function vlookup(lookupValue, tableArray, colIndexNum, rangeLookup) {
    for (let i = 0; i < tableArray.length; i++) {
      const row = tableArray[i];

      if (row[0] === lookupValue) {
        return row[colIndexNum - 1];
      }
    }
    if (!rangeLookup) {
      return "#N/A";
    }
    return tableArray[tableArray.length - 1][colIndexNum - 1];
  }

  const F1 = normalDistFi.map((v, i) =>
    vlookup(
      sortedData.length - i - 1,
      normalDistFi.map((v, i) => [i, v]),
      2,
      false
    )
  );

  const FLn = F1.map(
    (v, i) =>
      ((2 * (i + 1) - 1) *
        (Math.log(normalDistFi[i]) / Math.log(Math.E) +
          Math.log(1 - v) / Math.log(Math.E))) /
      sortedData.length
  );

  const ad = -sortedData.length - FLn.reduce((pre, cur) => cur + pre);
  const adjustedAd =
    ad * (1 + 0.75 / sortedData.length + 2.25 / Math.pow(sortedData.length, 2));
  let pValue = 0.0;

  if (adjustedAd >= 0.6) {
    pValue = Math.exp(
      1.2937 - 5.709 * adjustedAd + 0.0186 * Math.pow(adjustedAd, 2)
    );
  } else if (adjustedAd > 0.34 && adjustedAd < 0.6) {
    pValue = Math.exp(
      0.9177 - 4.279 * adjustedAd - 1.38 * Math.pow(adjustedAd, 2)
    );
  } else if (adjustedAd > 0.2 && adjustedAd <= 0.34) {
    pValue =
      1 -
      Math.exp(-8.318 + 42.796 * adjustedAd + 59.938 * Math.pow(adjustedAd, 2));
  } else {
    pValue =
      1 -
      Math.exp(
        -13.436 + 101.14 * adjustedAd - 223.73 * Math.pow(adjustedAd, 2)
      );
  }
  return {
    testStasc: adjustedAd,
    pValue,
  };
}
