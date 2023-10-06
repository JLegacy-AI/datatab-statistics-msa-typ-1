import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import SAMPLE_DATA from "../../assets/Process capability sample data.csv";
import { convertToArray, createInitialData } from "../../utils/utils";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import FAQ from "../../components/FAQ";

// Lazy Loading
const Setting = lazy(() => import("../../components/Setting"));
const Results = lazy(() => import("../../components/Results"));
const DataTable = lazy(() => import("../../components/Handsontable"));
const Documentation = lazy(() => import("../../components/Documentation"));
const ProcessStatistics = lazy(() =>
  import("../../components/ProcessStatistics")
);

const MsaType1 = () => {
  //For Visible and Not Visible on Scrolling
  const [visibleResults, setVisibleResults] = useState(false);

  //For printing Component
  const printComponentRef = useRef(null);

  //Only For Printing
  const [product, setProduct] = useState("");
  const [gauge, setGauge] = useState("");
  const [productFeature, setProductFeature] = useState("");
  const [messNormal, setMessNormal] = useState("");
  const [dateOfMeasurement, setDateOfMeasurement] = useState("");
  const [reportCreater, setReportCreater] = useState("");

  // For Computation
  const [referenceValue, setReferenceValue] = useState(11.6);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [column, setColumn] = useState(0);
  const [LSL, setLSL] = useState();
  const [USL, setUSL] = useState();
  const [k, setK] = useState(4);
  const [percentageTolerance, setPercentageTolerance] = useState(20);

  // Read File
  const readFile = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      parsedData = createInitialData(parsedData, 40, 26);
      setData(parsedData);
      setVisible(true);
    };

    reader.readAsBinaryString(file);
  };

  // Handle File Selection
  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    readFile(file);
    Swal.fire({
      icon: "success",
      title: "Data Read Successfully",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  // Fetch Data
  const fetchData = async () => {
    try {
      const response = await fetch(SAMPLE_DATA);
      const blob = await response.blob();
      readFile(blob);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // On start Read FIle
  useEffect(() => {
    const testFunction = (e) => {
      const scrollTop = window.scrollY;
      if (scrollTop > 300 && !visibleResults) {
        setVisibleResults(true);
      }
    };

    window.addEventListener("scroll", testFunction);

    fetchData();
  }, []);

  // Handle Clear Table
  const handleClearTable = () => {
    let emptyData = [];
    for (let i = 0; i < 40; i++) {
      let row = [];
      for (let j = 0; j < 40; j++) {
        row.push("");
      }
      emptyData.push(row);
    }
    setData(emptyData);
    Swal.fire({
      icon: "success",
      title: "Table Data Cleared",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  // Handle Print
  const handleToPrint = useReactToPrint({
    content: () => printComponentRef.current,
    documentTitle: "Datatab Report",
    pageStyle: `@media print {
        @page {
          size: 300mm 400mm;
          margin: 20mm 10mm;
        }
      }`,
  });

  return (
    <div>
      <h1 className="font-bold text-2xl mb-3">Dateninput</h1>
      <div className="flex gap-4 flex-row  items-start">
        <button
          className="hover:text-green-600 transition-all duration-300"
          onClick={() => handleClearTable()}
        >
          Alle Daten löschen
        </button>
        <input
          className="hover:text-green-600 transition-all duration-300"
          type="file"
          onChange={(e) => handleFileSelection(e)}
        />
        <button
          className="underline hover:text-blue-600 transition-all duration-300"
          onClick={() => fetchData()}
        >
          Beispieldaten laden
        </button>
      </div>
      <div>
        {data.length === 0 ? (
          <p className="flex justify-center items-center font-bold  min-h-[18.75rem] w-screen">
            Es liegen noch keine Daten vor
          </p>
        ) : (
          <>
            <Suspense
              fallback={
                <p className="flex justify-center items-center font-bold  min-h-[18.75rem] w-screen">
                  Es liegen noch keine Daten vor
                </p>
              }
            >
              <DataTable dataTable={data} setDataTable={setData} />
            </Suspense>
          </>
        )}
      </div>

      <div className="">
        {visible ? (
          <>
            <hr className=" mb-5" />
            <div ref={printComponentRef}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <Suspense
                  fallback={
                    <p className="flex justify-center items-center font-bold  min-h-[18.75rem] w-screen">
                      Es liegen noch keine Daten vor
                    </p>
                  }
                >
                  <Setting
                    data={data}
                    column={column}
                    setColumn={setColumn}
                    setLSL={setLSL}
                    setUSL={setUSL}
                    LSL={LSL}
                    USL={USL}
                    k={k}
                    setK={setK}
                    percentageTolerance={percentageTolerance}
                    setPercentageTolerance={setPercentageTolerance}
                    setReferenceValue={setReferenceValue}
                    referenceValue={referenceValue}
                  />
                </Suspense>

                <Suspense
                  fallback={
                    <p className="flex justify-center items-center font-bold  min-h-[18.75rem] w-screen">
                      Es liegen noch keine Daten vor
                    </p>
                  }
                >
                  <Documentation
                    product={product}
                    setProduct={setProduct}
                    messNormal={messNormal}
                    setMessNormal={setMessNormal}
                    gauge={gauge}
                    setGauge={setGauge}
                    productFeature={productFeature}
                    setProductFeature={setProductFeature}
                    reportCreater={reportCreater}
                    setReportCreater={setReportCreater}
                    dateOfMeasurement={dateOfMeasurement}
                    setDateOfMeasurement={setDateOfMeasurement}
                  />
                </Suspense>
              </div>
              <hr className="border my-10" />
              {visibleResults && (
                <Suspense
                  fallback={
                    <p className="flex justify-center items-center font-bold  min-h-[25rem] w-screen">
                      Es liegen noch keine Daten vor
                    </p>
                  }
                >
                  <Results
                    data={convertToArray(data, column)}
                    LSL={LSL}
                    USL={USL}
                    referenceValue={referenceValue}
                    column={data.length > 0 ? data[0][column] : "N/A"}
                    percentageTolerance={percentageTolerance}
                  />
                </Suspense>
              )}

              <hr className="border my-10" />
              <Suspense
                fallback={
                  <p className="flex justify-center items-center font-bold  min-h-[18.75rem] w-screen">
                    Es liegen noch keine Daten vor
                  </p>
                }
              >
                <ProcessStatistics
                  data={convertToArray(data, column)}
                  referenceValue={referenceValue}
                  LSL={LSL}
                  USL={USL}
                  percentageTolerance={percentageTolerance}
                  k={k}
                />
              </Suspense>
            </div>
            <hr className="border mt-10" />
            {/* Print Buttons */}
            <div className=" flex justify-center items-center py-10">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => handleToPrint()}
              >
                Bericht drucken oder runterladen
              </button>
            </div>
          </>
        ) : (
          <div className="h-60 flex justify-center items-center">
            Waiting / Loading Data
          </div>
        )}
      </div>
      <FAQ />
    </div>
  );
};

export default MsaType1;
