import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const buttonStyle = (x) => {
  return x
    ? "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium text-sm px-5 py-2.5 text-center"
    : "bg-gray-300 text-sm hover:bg-gray-400 text-gray-800 py-2 px-4";
};

const StickyHeader = () => {
  return (
    <div
      style={{ zIndex: 10000 }}
      className={`fixed top-0 w-screen bg-white shadow-md text-[10px]  md:text-lg`}
    >
      <Navbar />
      <div className="px-20 pb-3 inline-flex">
        <a className={buttonStyle(true)} href="#">
          MSA Typ 1
        </a>
        <a className={buttonStyle(false)} href="#">
          MSA Typ 2
        </a>
        <a
          className={buttonStyle(false)}
          href="https://qm-datalab.de/prozessfaehigkeitsanalyse"
        >
          Prozessfähigkeit
        </a>
        <a className={buttonStyle(false)} href="#">
          Regelkarten
        </a>
      </div>
    </div>
  );
};

export default StickyHeader;
