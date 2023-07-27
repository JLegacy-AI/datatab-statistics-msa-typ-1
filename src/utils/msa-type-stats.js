// import jStat from "jStat";

// // Sample data arrays for reference values and measurements
// const referenceValues = [10, 20, 30, 40, 50];
// const measurements = [11, 19, 31, 41, 49];
// const tolerance = 5;

// // function to calculate the bias
// function calculateBias(referenceValues, measurements) {
//   const meanReference = jStat.mean(referenceValues);
//   const meanMeasurements = jStat.stdev(measurements);
//   return meanMeasurements - meanReference;
// }

// // function to calculate the p-value for bias using t-test
// function calculatePValueForBias(referenceValues, measurements) {
//   const n = referenceValues.length;
//   const bias = calculateBias(referenceValues, measurements);
//   const standardDeviaon = calculateStandardDeviaon(measurements);
//   const standardError = standardDeviaon / Math.sqrt(n);
//   const tStasc = bias / standardError;
//   const degreesOfFreedom = n - 2;
//   const pValue = 2 * (1 - tDistribuonCDF(Math.abs(tStasc), degreesOfFreedom));
//   return pValue;
// }
// // function to calculate the cumulave distribuon function (CDF) of t-distribuon
// function tDistribuonCDF(x, dof) {
//   const t = Math.abs(x);
//   const n = dof;
//   const tSquared = Math.pow(t, 2);
//   const a = tSquared / (tSquared + n);
//   const b = n / (tSquared + n);
//   let sum = 0;
//   let term = 1;
//   let i = 1;
//   while (term > 1e-12) {
//     term *= (b * (i - 0.5)) / (a + b * (i - 1));
//     sum += term;
//     i++;
//   }
//   return (
//     (sum *
//       Math.sqrt(a * b) *
//       Math.exp(logGamma((n + 1) / 2) - logGamma(n / 2))) /
//     Math.sqrt(Math.PI * n)
//   );
// }
// // function to calculate the logarithm of the gamma function
// function logGamma(x) {
//   const c = [
//     76.18009172947146, -86.50532032941677, 24.01409824083091, 1.231739572450155,
//     0.1208650973866179e-2, -0.5395239384953e-5,
//   ];
//   let y = x;
//   let tmp = x + 5.5 - (x + 0.5) * Math.log(x + 5.5);
//   let ser = 1.000000000190015;
//   for (let j = 0; j <= 5; j++) {
//     ser += c[j] / ++y;
//   }
//   return -tmp + Math.log((2.5066282746310005 * ser) / x);
// }
// // function to calculate the Cg and Cgk values
// function calculateCgAndCgk(referenceValues, measurements) {
//   const standardDeviaon = calculateStandardDeviaon(measurements);
//   const bias = calculateBias(referenceValues, measurements);
//   const cg = (6 * standardDeviaon) / bias;
//   const cgk =
//     cg * Math.sqrt(1 + (1 / 12) * Math.pow(bias / standardDeviaon, 2));
//   return { cg, cgk };
// }
// // function to create a run chart
// function createRunChart(referenceValues, measurements, tolerance) {
//   const chartData = [];
//   const referenceLine = { x: [], y: [] };
//   const upperToleranceLine = { x: [], y: [] };
//   const lowerToleranceLine = { x: [], y: [] };
//   for (let i = 0; i < referenceValues.length; i++) {
//     chartData.push({ x: i, y: measurements[i] });
//     referenceLine.x.push(i);
//     referenceLine.y.push(referenceValues[i]);
//     upperToleranceLine.x.push(i);
//     upperToleranceLine.y.push(referenceValues[i] + 0.1 * tolerance);
//     lowerToleranceLine.x.push(i);
//     lowerToleranceLine.y.push(referenceValues[i] - 0.1 * tolerance);
//   }
//   return { chartData, referenceLine, upperToleranceLine, lowerToleranceLine };
// }
// // Perform the Measurement System Analysis Type 1
// const bias = calculateBias(referenceValues, measurements);
// const pValue = calculatePValueForBias(referenceValues, measurements);
// const { cg, cgk } = calculateCgAndCgk(referenceValues, measurements);
// // Generate the run chart
// const { chartData, referenceLine, upperToleranceLine, lowerToleranceLine } =
//   createRunChart(referenceValues, measurements, tolerance);
// // Output the MSA results
// console.log("Bias:", bias);
// console.log("p-value for Bias:", pValue);
// console.log("Cg:", cg);
// console.log("Cgk:", cgk);
// // Output the run chart
// console.log("Run Chart:");
// console.log("Measurement\tReference\tUpper Tolerance\tLower Tolerance");
// for (let i = 0; i < chartData.length; i++) {
//   console.log(
//     `${chartData[i].y}\t\t${referenceLine.y[i]}\t\t${upperToleranceLine.y[i]}\t\t${lowerToleranceLine.y[i]}`
//   );
// }
