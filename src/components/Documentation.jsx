import React from "react";

const Documentation = ({
  product,
  setProduct,
  messNormal,
  setMessNormal,
  gauge,
  setGauge,
  productFeature,
  setProductFeature,
  reportCreater,
  setReportCreater,
  dateOfMeasurement,
  setDateOfMeasurement,
}) => {
  return (
    <div className="h-full flex flex-col justify-between px-5 md:border-l-2">
      <h1 className="font-bold text-2xl">Documentation</h1>
      <div className="grid gap-6 mb-6 md:grid-cols-2 my-5">
        <div>
          <label
            htmlFor="LSL"
            className="block mb-2 text-sm font-medium text-sky-700 dark:text-white"
          >
            Produkt
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-sky-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="LSL"
            className="block mb-2 text-sm font-medium text-sky-700 dark:text-white"
          >
            Messgerät
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-sky-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={gauge}
            onChange={(e) => setGauge(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="LSL"
            className="block mb-2 text-sm font-medium text-sky-700 dark:text-white"
          >
            Produktmerkmal
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-sky-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={productFeature}
            onChange={(e) => setProductFeature(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="LSL"
            className="block mb-2 text-sm font-medium text-sky-700 dark:text-white"
          >
            Messnormal / Referenz
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-sky-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={messNormal}
            onChange={(e) => setMessNormal(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="LSL"
            className="block mb-2 text-sm font-medium text-sky-700 dark:text-white"
          >
            Datum der Messungen
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-sky-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={dateOfMeasurement}
            onChange={(e) => setDateOfMeasurement(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="LSL"
            className="block mb-2 text-sm font-medium text-sky-700 dark:text-white"
          >
            Berichtersteller
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-sky-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={reportCreater}
            onChange={(e) => setReportCreater(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Documentation;
