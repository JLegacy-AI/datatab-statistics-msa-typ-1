import React from "react";
import HistogramChart from "./HistogramChart";
import NormalProbabilityPlot from "./NormalProbabilityPlot";

const Results = ({ data, column, curve, bins, xmax, xmin, LSL, USL }) => {
  xmax = xmax == null ? Math.max(data) : xmax;
  xmin = xmin == null ? Math.min(data) : xmin;

  return (
    <div>
      <h1 className="font-bold text-2xl">Results</h1>
      <div className="flex flex-row flex-wrap  gap-4 items-center  justify-center">
        <div className="h-auto flex justify-center items-center flex-col border rounded-lg  pt-2 shadow-lg min-w-[300px]">
          <h1 className="bg-[#1f77b4] min-w-[200px] px-3 text-center rounded-sm text-white shadow-md">
            {`Histogram of ${column}`}
          </h1>
          {data.length == 0 ? (
            <p className="h-[200px] flex justify-center items-center font-light text-xl">
              No Data Found Yet
            </p>
          ) : (
            <HistogramChart
              data={data}
              curve={curve}
              bin={bins}
              xmax={xmax}
              xmin={xmin}
              LSL={LSL}
              USL={USL}
            />
          )}
        </div>
        <div className="h-auto flex justify-center items-center flex-col border rounded-lg  pt-2 shadow-lg min-w-[250px]">
          {typeof data[0] != "string" ? (
            <>
              <h1 className="bg-[rgb(31,119,180)] min-w-[200px] px-3 text-center rounded-sm text-white shadow-md">
                {`Normal Probability Plot of ${column}`}
              </h1>
              {data.length == 0 ? (
                <p className="h-[200px] flex justify-center items-center font-light text-xl min-w-[400px]">
                  No Data Found Yet
                </p>
              ) : (
                <NormalProbabilityPlot data={data} />
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
