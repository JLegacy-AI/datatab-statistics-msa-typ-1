import React, { useRef, useMemo } from "react";
import { HotTable, HotColumn } from "@handsontable/react";
import Swal from "sweetalert2";
import "handsontable/dist/handsontable.min.css";

const DataTable = ({ dataTable, setDataTable }) => {
  const hotRef = useRef(null);
  const [header, ...content] = dataTable;

  const hotTable = useMemo(
    () => (
      <div>
        <HotTable
          className="mt-[10px]"
          ref={hotRef}
          data={content}
          rowHeaders={true}
          viewportRowRenderingOffset={10}
          colWidths={150}
          viewportColumnRenderingOffset={10}
          colHeaders={(index) => {
            return header[index];
          }}
          licenseKey="non-commercial-and-evaluation"
          modifyData={(row, col, { value }, ioMode) => {
            if (ioMode === "set") {
              content[row][col] = value;
              setDataTable([header, ...content]);
            }
          }}
          afterOnCellMouseDown={(e, coords, TH) => {
            if (coords.row == -1 && coords.col != -1 && e.button == 0) {
              Swal.fire({
                title: "Column Name",
                input: "text",
                inputPlaceholder: "Enter Column Name",
                inputValue: header[coords.col],
                showCancelButton: true,
                confirmButtonText: "Save Changes",
              }).then((result) => {
                if (result.isConfirmed) {
                  const name = result.value;
                  header[coords.col] = name;
                  TH.innerText = name;
                  setDataTable([header, ...content]);
                }
              });
            }
          }}
        >
          {content.map((value, key) => {
            return <HotColumn data={key} key={key} />;
          })}
        </HotTable>
      </div>
    ),
    [dataTable]
  );

  return <div className="h-[300px] overflow-hidden">{hotTable}</div>;
};

export default DataTable;
