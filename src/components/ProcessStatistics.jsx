import React from "react";
import jstat from "jStat";
import { calculateBias, calculateT } from "../utils/utils";

const ProcessStatistics = ({
  data,
  referenceValue,
  USL,
  LSL,
  percentageTolerance,
  k,
}) => {
  const tolerance = USL - LSL;
  const standardDeviation = jstat.stdev(data);
  const mean = jstat.mean(data);

  const bias = mean - referenceValue;
  const tValue = calculateT(data, referenceValue);
  const pValue = jstat.ttest(Number(referenceValue), data, 2);

  let cg = ((percentageTolerance / 100) * tolerance) / (k * standardDeviation);
  let cgk =
    (((0.5 * percentageTolerance) / 100) * tolerance - Math.abs(bias)) /
    (0.5 * k * standardDeviation);
  if (data.length < 2) {
    cg = "";
    cgk = "";
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold bg-black text-white  text-center">
            Basic Statistics
          </h3>
          <table>
            <tbody>
              <tr>
                <td>Reference Value</td>
                <td>{referenceValue}</td>
              </tr>
              <tr>
                <td>Measurements</td>
                <td>{data.length}</td>
              </tr>
              <tr>
                <td>Average</td>
                <td>{data == [] ? "" : jstat.mean(data).toFixed(6)}</td>
              </tr>
              <tr>
                <td>Standard dev</td>
                <td>{data == [] ? "" : jstat.stdev(data).toFixed(6)}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Tolerance</td>
                <td>
                  {isNaN(USL) || isNaN(LSL)
                    ? ""
                    : Number(Math.abs(USL - LSL).toFixed(4))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="text-xl font-semibold bg-black text-white  text-center">
            Bias and Gage Capability
          </h3>
          <table>
            <tbody>
              <tr>
                <td>Bias</td>
                <td>{isNaN(bias) ? "" : bias.toFixed(6)}</td>
              </tr>
              <tr>
                <td>T</td>
                <td>{tValue}</td>
              </tr>
              <tr>
                <td>P-Value</td>
                <td>{isNaN(pValue) ? "" : pValue.toFixed(5)}</td>
              </tr>
              <tr className="h-5">
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Cg</td>
                <td>
                  {typeof cg === "string" || isNaN(cg) ? "" : cg.toFixed(6)}
                </td>
              </tr>
              <tr>
                <td>Cgk</td>
                <td>
                  {typeof cgk === "string" || isNaN(cgk) ? "" : cgk.toFixed(6)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProcessStatistics;
