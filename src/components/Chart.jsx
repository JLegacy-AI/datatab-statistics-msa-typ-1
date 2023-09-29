import jstat from "jStat";
import React,{useState, useEffect} from "react";
import Plot from "react-plotly.js";

const Chart = ({
  data,
  LSL,
  USL,
  referenceValue,
  column,
  percentageTolerance,
}) => {
  const tolerance = Math.abs(USL - LSL);
  const mean = jstat.mean(data);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // Update the window width when the window is resized
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
    const chartWidth = windowWidth > 768 ? 800 : windowWidth - 20;
  return (
    <div>
      <Plot
        data={[
          {
            name: "Values",
            x: data.map((v, i) => i + 1),
            y: data.map((v, i) => v),
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "#1f77b4" },
          },
          {
            name: "Mean",
            x: [1, data.length],
            y: [mean, mean],
            mode: "lines",
            line: {
              dash: "dot",
            },
            marker: { color: "blue" },
          },
          {
            name: "ref",
            x: [1, data.length],
            y: [referenceValue, referenceValue],
            mode: "lines",
            line: {
              dash: "dot",
            },
            marker: { color: "red" },
          },
          {
            name: `ref + ${(percentageTolerance / 2 / 100).toFixed(2)} * Tol`,
            x: [1, data.length],
            y: [
              referenceValue + (percentageTolerance / 2 / 100) * tolerance,
              referenceValue + (percentageTolerance / 2 / 100) * tolerance,
            ],
            mode: "lines",
            marker: { color: "red" },
          },
          {
            name: `ref - ${(percentageTolerance / 2 / 100).toFixed(2)} * Tol`,
            x: [1, data.length],
            y: [
              referenceValue - (percentageTolerance / 2 / 100) * tolerance,
              referenceValue - (percentageTolerance / 2 / 100) * tolerance,
            ],
            mode: "lines",
            marker: { color: "red" },
          },
        ]}
        layout={{
          width: chartWidth-100 > 660 ? 660: chartWidth, 
          height: chartWidth*0.6  < 400 ? 400 : chartWidth*0.5, // Set a fixed chart height or adjust as needed
        
          // width: 660,
          // height: 400,
          autosize: true,
          xaxis: {
            title: "Beobachtung",
            zeroline: false,
          },
          yaxis: {
            title: column,
            showticklabels: true,
            zeroline: false,
          },
          showlegend: true,
        }}
      />
    </div>
  );
};

export default Chart;
