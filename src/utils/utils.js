import jstat from "jStat";

const convertToArray = (data, column) => {
  let array = [];
  for (let i = 1; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (j === column && data[i][j] !== "" && data[i][j] !== null) {
        if (!isNaN(data[i][j])) {
          array.push(Number(data[i][j]));
        } else {
          array.push(data[i][j]);
        }
      }
    }
  }
  return array;
};

const createInitialData = (data, rows, columns) => {
  const initialData = [];
  if (data.length < rows - 5)
    for (let i = 0; i < rows; i++) {
      const row = [];
      if (i < data.length) {
        row.push(...data[i]);
        row.push(
          ...Array.from(
            {
              length:
                data[i].length < columns - 5 ? columns - data[i].length : 5,
            },
            () => ""
          )
        );
      }
      row.push(...Array.from({ length: columns }, () => ""));
      initialData.push(row);
    }
  else {
    for (let i = 0; i < data.length; i++) {
      const row = [];
      if (i < data.length) {
        row.push(...data[i]);
        row.push(
          ...Array.from(
            {
              length:
                data[i].length < columns - 5 ? columns - data[i].length : 5,
            },
            () => ""
          )
        );
      }
      row.push(...Array.from({ length: columns }, () => ""));
      initialData.push(row);
    }

    for (let i = 0; i < 5; i++) {
      initialData.push(Array.from({ length: data[0].length }, () => ""));
    }
  }

  return initialData;
};

export function calculateBias(dataArray, benchmarkValue) {
  if (dataArray.length === 0 || isNaN(benchmarkValue)) {
    return "NaN";
  }

  // Calculate the mean of the data array
  const dataMean = jstat.mean(dataArray);

  // Calculate the bias as the difference between the data mean and the benchmark value
  const bias = dataMean - benchmarkValue;

  return Number(bias.toFixed(6));
}

export function calculateT(dataArray, referenceValue) {
  if (dataArray.length === 0 || isNaN(referenceValue)) {
    return "NaN";
  }
  const mean = Number(jstat.mean(dataArray));
  const stdev = Number(jstat.stdev(dataArray));
  return Number(
    (
      ((mean - Number(referenceValue)) * Math.sqrt(dataArray.length)) /
      stdev
    ).toFixed(6)
  );
}

export function documentationTable(
  product,
  gauge,
  productFeature,
  messNormal,
  dateOfMeasurement,
  reportCreater
) {
  const table = document.createElement("table");
  table.setAttribute("class", "my-5");

  const tbody = document.createElement("tbody");

  // Create table rows and cells
  const rows = [
    { label: "Produkt", value: product },
    { label: "Messgerät", value: gauge },
    { label: "Produktmerkmal", value: productFeature },
    { label: "Messnormal / Referenz", value: messNormal },
    { label: "Datum der Messungen", value: dateOfMeasurement },
    { label: "Berichtersteller", value: reportCreater },
  ];

  rows.forEach((row) => {
    const tr = document.createElement("tr");
    const labelCell = document.createElement("td");
    labelCell.setAttribute("class", "w-[200px] font-semibold");
    const valueCell = document.createElement("td");

    labelCell.textContent = row.label;
    valueCell.textContent = row.value;

    tr.appendChild(labelCell);
    tr.appendChild(valueCell);
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);

  return table;
}

export { convertToArray, createInitialData };
