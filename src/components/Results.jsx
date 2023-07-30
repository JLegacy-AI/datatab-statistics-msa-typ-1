import React from "react";
import Chart from "./Chart";

const Results = ({ data, column, LSL, USL, referenceValue }) => {
  return (
    <div>
      <h1 className="font-bold text-2xl">Results</h1>
      <div className="flex flex-row flex-wrap  gap-4 items-center  justify-center">
        <div className="h-auto flex justify-center items-center flex-col border rounded-lg  pt-2 shadow-lg min-w-[300px]">
          <h1 className="bg-[#1f77b4] min-w-[200px] px-3 text-center rounded-sm text-white shadow-md">
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
