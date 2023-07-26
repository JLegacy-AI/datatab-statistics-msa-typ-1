import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import SAMPLE_DATA from "../assets/Process capability sample data.csv";
import Setting from "./Setting";
import Results from "./Results";
import { convertToArray, createInitialData } from "../utils/utils";
import ProcessStatistics from "./ProcessStatistics";
import jstat from "jStat";
import Swal from "sweetalert2";
import ContentComponent from "./ContentComponent";
import DataTable from "./Handsontable";

const ProcessCapability = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [column, setColumn] = useState(0);
  const [curve, setCurve] = useState("normal");
  const [type, setType] = useState("probability");
  const [target, setTarget] = useState(
    jstat.mean(convertToArray(data, column))
  );
  const [LSL, setLSL] = useState(null);
  const [USL, setUSL] = useState(null);
  const [bins, setBins] = useState(6);
  const [xmin, setXMin] = useState(null);
  const [xmax, setXMax] = useState(null);

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

  const fetchData = async () => {
    try {
      const response = await fetch(SAMPLE_DATA);
      const blob = await response.blob();
      readFile(blob);
      Swal.fire({
        icon: "success",
        title: "Example Data Loaded",
        text: `Data Readed from the Sample file`,
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (curve == "normal")
      setCurve(
        typeof convertToArray(data, column)[0] == "string" &&
          isNaN(convertToArray(data, column)[0])
          ? "frequency"
          : curve
      );
  }, [data, column]);

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

  return (
    <div>
      <h1 className="font-bold text-2xl mb-3">Data input</h1>
      <div className="flex gap-4">
        <button
          className="hover:text-green-600 transition-all duration-300"
          onClick={() => handleClearTable()}
        >
          Clear Table
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
          Load Example Data
        </button>
      </div>
      <div>
        {data.length == 0 ? (
          <p className="flex justify-center items-center font-bold">
            Data is Not Present Yet
          </p>
        ) : (
          <>
            <DataTable dataTable={data} setDataTable={setData} />
          </>
        )}
      </div>

      <div className="">
        {visible ? (
          <>
            <hr className=" mb-5" />
            <Setting
              data={data}
              column={column}
              setColumn={setColumn}
              setCurve={setCurve}
              curve={curve}
              type={type}
              setType={setType}
              setLSL={setLSL}
              setUSL={setUSL}
              setTarget={setTarget}
              LSL={LSL}
              USL={USL}
              setBins={setBins}
              bins={bins}
              xmax={xmax}
              xmin={xmin}
              setXMax={setXMax}
              setXMin={setXMin}
            />
            <hr className="border my-10" />
            <Results
              data={convertToArray(data, column)}
              curve={curve}
              bins={bins}
              xmax={xmax}
              LSL={LSL}
              USL={USL}
              xmin={xmin}
              column={data[0][column]}
            />
            <hr className="border my-10" />
            <ProcessStatistics
              data={convertToArray(data, column)}
              target={target}
              USL={USL}
              LSL={LSL}
              xmax={xmax}
              xmin={xmin}
            />
          </>
        ) : (
          <div className="h-60 flex justify-center items-center">
            Waiting / Loading Data
          </div>
        )}
      </div>
      <hr className="border my-20" />
      <ContentComponent />
    </div>
  );
};

export default ProcessCapability;
