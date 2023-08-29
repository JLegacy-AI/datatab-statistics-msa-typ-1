import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const buttonStyle = (x) => {
  return x
    ? "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium text-sm px-5 py-2.5 text-center"
    : "bg-gray-300 text-sm hover:bg-gray-400 text-gray-800 py-2 px-4";
};

const StickyHeader = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      style={{ zIndex: 10000 }}
      className="fixed top-0 w-screen bg-white shadow-md text-[10px]  md:text-lg"
    >
      <Navbar />
      <div className="w-screen  flex md:hidden justify-end items-center pr-5 py-2">
        <button
          className=" h-[30px] rounded-md px-2 py-2  bg-blue-800 text-white"
          onClick={() => setVisible(!visible)}
        >
          Menu
        </button>
      </div>
      <>
        {visible ? (
          <>
            <div className="px-5 pb-3 flex flex-col">
              <a className={buttonStyle(true)} href="#">
                MSA Typ 1
              </a>
              <a className={buttonStyle(false)} href="#">
                MSA Typ 2
              </a>
              <a
                className={buttonStyle(false)}
                href="https://qm-datalab.de/prozessfaehigkeitsanalyse"
                target="_blank"
              >
                Prozessfähigkeit
              </a>
              <a className={buttonStyle(false)} href="#">
                Regelkarten
              </a>
            </div>
          </>
        ) : (
          ""
        )}
      </>
      <>
        <div className="px-5 md:px-20 hidden pb-3 md:flex flex-col md:flex-row ">
          <a className={buttonStyle(true)} href="#">
            MSA Typ 1
          </a>
          <a className={buttonStyle(false)} href="#">
            MSA Typ 2
          </a>
          <a
            className={buttonStyle(false)}
            href="https://qm-datalab.de/prozessfaehigkeitsanalyse"
            target="_blank"
          >
            Prozessfähigkeit
          </a>
          <a className={buttonStyle(false)} href="#">
            Regelkarten
          </a>
        </div>
      </>
    </div>
  );
};

export default StickyHeader;
