import jStat from "jStat";

const criticalValues = [
  [0.0, 0.995, 0.99, 0.975, 0.95, 0.925, 0.9],
  [0.97764, 0.9293, 0.9, 0.84189, 0.77639, 0.72614, 0.68377],
  [0.92063, 0.829, 0.78456, 0.7076, 0.63604, 0.59582, 0.56481],
  [0.85046, 0.73421, 0.68887, 0.62394, 0.56522, 0.52476, 0.49265],
  [0.78137, 0.66855, 0.62718, 0.56327, 0.50945, 0.47439, 0.44697],
  [0.72479, 0.6166, 0.57741, 0.51926, 0.46799, 0.43526, 0.41035],
  [0.6793, 0.5758, 0.53844, 0.48343, 0.43607, 0.40497, 0.38145],
  [0.64098, 0.5418, 0.50654, 0.45427, 0.40962, 0.38062, 0.35828],
  [0.60846, 0.5133, 0.4796, 0.43001, 0.38746, 0.36006, 0.33907],
  [0.58042, 0.48895, 0.45662, 0.40925, 0.36866, 0.3425, 0.32257],
  [0.55588, 0.4677, 0.4367, 0.39122, 0.35242, 0.32734, 0.30826],
  [0.53422, 0.44905, 0.41918, 0.37543, 0.33815, 0.31408, 0.29573],
  [0.5149, 0.43246, 0.40362, 0.36143, 0.32548, 0.30233, 0.28466],
  [0.49753, 0.4176, 0.3897, 0.3489, 0.31417, 0.29181, 0.27477],
  [0.48182, 0.4042, 0.37713, 0.3376, 0.30397, 0.28233, 0.26585],
  [0.4675, 0.392, 0.36571, 0.32733, 0.29471, 0.27372, 0.25774],
  [0.4544, 0.38085, 0.35528, 0.31796, 0.28627, 0.26587, 0.25035],
  [0.44234, 0.37063, 0.34569, 0.30936, 0.27851, 0.25867, 0.24356],
  [0.43119, 0.36116, 0.33685, 0.30142, 0.27135, 0.25202, 0.23731],
  [0.42085, 0.3524, 0.32866, 0.29407, 0.26473, 0.24587, 0.23152],
  [0.37843, 0.31656, 0.30349, 0.26404, 0.23767, 0.22074, 0.20786],
  [0.34672, 0.28988, 0.27704, 0.2417, 0.21756, 0.20207, 0.19029],
  [0.32187, 0.26898, 0.25649, 0.22424, 0.20184, 0.18748, 0.17655],
  [0.30169, 0.25188, 0.23993, 0.21017, 0.18939, 0.1761, 0.16601],
  [0.28482, 0.2378, 0.22621, 0.19842, 0.17881, 0.16626, 0.15673],
  [0.27051, 0.22585, 0.2146, 0.18845, 0.16982, 0.1579, 0.14886],
  [1.94947, 1.62762, 1.51743, 1.3581, 1.22385, 1.13795, 1.07275],
];

const getCriticalValues = (n) => {
  if (1 <= n && n <= 20) {
    return criticalValues[n][2];
  } else if (25 >= n) {
    return criticalValues[20][2];
  } else if (30 >= n) {
    return criticalValues[21][2];
  } else if (35 >= n) {
    return criticalValues[22][2];
  } else if (40 >= n) {
    return criticalValues[23][2];
  } else if (45 >= n) {
    return criticalValues[24][2];
  } else if (50 >= n) {
    return criticalValues[25][2];
  } else {
    return criticalValues[26][2] / Math.sqrt(n);
  }
};

export const kolmogorovSmirov = (data) => {
  const mean = jStat.mean(data);
  const stdev = jStat.stdev(data);

  const sortedData = data.slice().sort((a, b) => a - b);
  const expected = sortedData.map((v, i) => i / sortedData.length);
  const rank = sortedData.map((v, i) => i / sortedData.length);
  const normalInv = expected.map((v, i) => jStat.normal.inv(v, mean, stdev));
  const actual = sortedData.map((v, i) => jStat.normal.cdf(v, mean, stdev));
  const difference = rank.map((v, i) => Math.abs(v - actual[i]));
  const D = Math.max(...difference);

  const calculatePValue = (D, n) => {
    // Calculate the p-value using the Chi-Square distribution
    const pValue = 1 - 2 * (1 - jStat.chisquare.cdf(n * D * D, 1));

    return pValue;
  };

  const pValue = calculatePValue(getCriticalValues(30), 30);

  return {
    testStats: D,
    pValue: pValue,
  };
};
