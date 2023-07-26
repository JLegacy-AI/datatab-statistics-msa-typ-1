import React, { useState } from "react";

const Button = ({
  label,
  onClick,
  index,
  selectedButton,
  setSelectedButton,
}) => {
  const handleClick = (index) => {
    setSelectedButton(index);
    onClick(index);
  };

  return (
    <button
      className={
        selectedButton === index
          ? `text-white bg-blue-700 cursor-not-allowed focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`
          : `py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`
      }
      disabled={index === selectedButton}
      onClick={() => handleClick(index)}
    >
      {label}
    </button>
  );
};

const Setting = ({
  data,
  setColumn,
  column,
  setCurve,
  curve,
  type,
  setType,
  setLSL,
  setUSL,
  setBins,
  LSL,
  USL,
  bins,
  setXMin,
  setXMax,
  xmin,
  xmax,
}) => {
  const [selectedButton, setSelectedButton] = useState(0);

  return (
    <div>
      <h1 className="font-bold text-2xl">Settings</h1>
      <div className="flex gap-10 items-center">
        <p className="py-5">Variable:</p>
        <div className="flex-1 flex justify-left items-center flex-wrap">
          {data[0] === [] ? (
            <p>No Columns Yet</p>
          ) : (
            data[0].map((label, key) => {
              return label != "" && label != null && label != undefined ? (
                <Button
                  label={label}
                  key={key}
                  index={key}
                  onClick={setColumn}
                  selectedButton={selectedButton}
                  setSelectedButton={setSelectedButton}
                />
              ) : (
                ""
              );
            })
          )}
        </div>
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2 my-5">
        <div>
          <label
            htmlFor="LSL"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            LSL
          </label>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled={isNaN(data[1][column])}
            placeholder={isNaN(data[1][column]) ? "Disabled" : ""}
            onChange={(e) => setLSL(e.target.value)}
            value={LSL}
          />
        </div>

        <div>
          <label
            htmlFor="USL"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            USL
          </label>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled={isNaN(data[1][column])}
            placeholder={isNaN(data[1][column]) ? "Disabled" : ""}
            onChange={(e) => setUSL(e.target.value)}
            value={USL}
          />
        </div>
        <div>
          <label
            htmlFor="Distibution"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Distribution
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={"none"}
            value={curve}
            disabled={isNaN(data[1][column])}
            onChange={(e) => setCurve(e.target.value)}
          >
            <option value="none">None</option>
            <option value="normal">Normal</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="no of bins"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            No of Bins
          </label>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled={isNaN(data[1][column])}
            placeholder={isNaN(data[1][column]) ? "Disabled" : ""}
            onChange={(e) => setBins(e.target.value)}
            value={bins}
            min={0}
          />
        </div>
        <div>
          <label
            htmlFor="xmax"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Xmin
          </label>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled={isNaN(data[1][column])}
            placeholder={isNaN(data[1][column]) ? "Disabled" : ""}
            value={xmin == null ? "" : xmin}
            onChange={(e) => setXMin(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="xmax"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Xmax
          </label>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled={isNaN(data[1][column])}
            placeholder={isNaN(data[1][column]) ? "Disabled" : ""}
            value={xmax == null ? "" : xmax}
            onChange={(e) => setXMax(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Setting;
