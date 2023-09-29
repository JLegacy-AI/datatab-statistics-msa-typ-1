import React from "react";
import Chart from "./Chart";

const Results = ({
  data,
  column,
  LSL,
  USL,
  referenceValue,
  percentageTolerance,
}) => {
  return (
    <div id="graph-content">
      <h1 className="font-bold text-2xl">Ergebnisse</h1>
      <div className="flex flex-row flex-wrap  gap-4 items-center  justify-center">
        <div className="h-auto flex justify-center items-center flex-col rounded-lg  pt-2 min-w-[300px]">
          <h1 className="bg-[#1f77b4] min-w-[200px] translate-y-16 -translate-x-8 px-3 text-center rounded-sm text-white shadow-md z-50">
            {`Verlaufsdiagramm für ${column}`}
          </h1>
          {data.length == 0 ? (
            <p className="h-[200px] flex justify-center items-center font-light text-xl">
              No Data Found Yet
            </p>
          ) : (
            <Chart
              data={data}
              LSL={LSL}
              USL={USL}
              referenceValue={referenceValue}
              column={column}
              percentageTolerance={percentageTolerance}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
