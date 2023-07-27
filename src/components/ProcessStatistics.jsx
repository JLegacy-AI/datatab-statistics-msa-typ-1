import React from "react";
import jstat from "jStat";

const ProcessStatistics = ({ data, referenceValue }) => {
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
                <td>NaN</td>
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
                <td>NaN</td>
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
                <td>NaN</td>
              </tr>
              <tr>
                <td>T</td>
                <td>NaN</td>
              </tr>
              <tr>
                <td>P-Value</td>
                <td>NaN</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProcessStatistics;
