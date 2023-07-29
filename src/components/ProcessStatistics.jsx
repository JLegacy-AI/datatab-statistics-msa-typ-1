import React from "react";
import jstat from "jStat";
import { calculateBias, calculateT } from "../utils/utils";

const ProcessStatistics = ({ data, referenceValue, USL, LSL }) => {
  const tolerance = USL - LSL;
  const standardDeviation = jstat.stdev(data);
  const mean = jstat.mean(data);
  let cg = tolerance / (6 * standardDeviation);
  let cgk = Math.abs(mean - tolerance) / (3 * standardDeviation);
  if (data.length < 2) {
    cg = "";
    cgk = "";
  }

  const bias = calculateBias(data, referenceValue);
  const tValue = calculateT(data, referenceValue);
  const pValue = jstat.ttest(Number(referenceValue), data, 2);
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
                <td>Cg</td>
                <td>{typeof cg === "string" ? cg : cg.toFixed(6)}</td>
              </tr>
              <tr>
                <td>Cgk</td>
                <td>{typeof cgk === "string" ? cgk : cgk.toFixed(6)}</td>
              </tr>
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
                <td>{data == [] ? "NaN" : jstat.mean(data).toFixed(6)}</td>
              </tr>
              <tr>
                <td>Standard dev</td>
                <td>{data == [] ? "NaN" : jstat.stdev(data).toFixed(6)}</td>
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
            Bias
          </h3>
          <table>
            <tbody>
              <tr>
                <td>Bias</td>
                <td>{bias}</td>
              </tr>
              <tr>
                <td>T</td>
                <td>{tValue}</td>
              </tr>
              <tr>
                <td>P-Value</td>
                <td>{isNaN(pValue) ? "NaN" : pValue.toFixed(5)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProcessStatistics;
