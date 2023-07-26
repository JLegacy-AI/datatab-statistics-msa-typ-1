import React from "react";
import * as jstat from "jStat";
import * as ss from "simple-statistics";

import { andersonDarlingTest } from "../utils/anderson-darling";
import { shapiroWilkTest } from "../utils/shapiro-walk";
import { kolmogorovSmirov } from "../utils/Kolmogorov-Smirnov";

const ProcessStatistics = ({
  data,
  LSL = undefined,
  USL = undefined,
  xmin,
  xmax,
}) => {
  const { W: swW, pValue: swPValue } =
    typeof data[0] == "string" || data.length == 0
      ? { W: "", pValue: "" }
      : shapiroWilkTest(data);
  const { testStasc: ADW, pValue: ADpValue } =
    typeof data[0] == "string" || data.length == 0
      ? {
          testStasc: "",
          pValue: "",
        }
      : andersonDarlingTest(data);
  const { testStats: ksW, pValue: ksPValue } =
    typeof data[0] == "string" || data.length == 0
      ? {
          testStasc: "",
          pValue: "",
        }
      : kolmogorovSmirov(data);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Process Capability</h1>
          <h3 className="text-xl font-semibold bg-black text-white  text-center">
            Summary
          </h3>
          <table>
            <tbody>
              <tr>
                <td>LSL</td>
                <td>{LSL}</td>
              </tr>
              <tr>
                <td>USL</td>
                <td>{USL}</td>
              </tr>
              <tr>
                <td>Mean</td>
                <td>{data == [] ? "NaN" : jstat.mean(data).toFixed(4)}</td>
              </tr>
              <tr>
                <td>N</td>
                <td>{data.length}</td>
              </tr>
              <tr>
                <td>Std. Deviation</td>
                <td>{data == [] ? "NaN" : jstat.stdev(data).toFixed(4)}</td>
              </tr>
              <tr>
                <td>Cp</td>
                <td>
                  {LSL == null || USL == null
                    ? ""
                    : ((USL - LSL) / (6 * jstat.stdev(data))).toFixed(4)}
                </td>
              </tr>
              <tr>
                <td>Cpk</td>
                <td>
                  {LSL == null || USL == null
                    ? ""
                    : Math.min(
                        (USL - jstat.mean(data)) / (3 * jstat.stdev(data)),
                        (jstat.mean(data) - LSL) / (3 * jstat.stdev(data))
                      ).toFixed(4)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h1 className="font-bold text-2xl">Normal Distribution Test</h1>
          <table>
            <thead className="text-xl font-semibold bg-black text-white  text-center">
              <tr>
                <th>Test</th>
                <th>Statistics</th>
                <th>p</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Shapiro-Wilk Test</td>
                <td>{typeof swW == "number" ? swW.toFixed(6) : swW}</td>
                <td>
                  {typeof swPValue == "number" ? swPValue.toFixed(6) : swPValue}
                </td>
              </tr>
              <tr>
                <td>Anderson-Darling Test</td>
                <td>{typeof ADW == "number" ? ADW.toFixed(6) : ADW}</td>
                <td>
                  {typeof ADpValue == "number" ? ADpValue.toFixed(6) : ADpValue}
                </td>
              </tr>
              <tr>
                <td>Kolmogorov-Smirnov Test</td>
                <td>{typeof ksW == "number" ? ksW.toFixed(6) : ksW}</td>
                <td>
                  {typeof ksPValue == "number" ? ksPValue.toFixed(6) : ksPValue}
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
