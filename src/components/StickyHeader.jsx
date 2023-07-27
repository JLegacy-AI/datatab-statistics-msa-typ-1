import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const buttonStyle = (x, y) => {
  return x == y
    ? "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium text-sm px-5 py-2.5 text-center"
    : "bg-gray-300 text-sm hover:bg-gray-400 text-gray-800 py-2 px-4";
};

const StickyHeader = ({ setTab, tab }) => {
  return (
    <div
      style={{ zIndex: 10000 }}
      className={`fixed top-0 w-screen bg-white shadow-md text-[10px]  md:text-lg`}
    >
      <Navbar />
      <div className="px-20 pb-3 inline-flex">
        <button className={buttonStyle(tab, 0)} onClick={() => setTab(0)}>
          MSA Typ 1
        </button>
        <button className={buttonStyle(tab, 1)} onClick={() => setTab(1)}>
          MSA Typ 2
        </button>
        <button className={buttonStyle(tab, 2)} onClick={() => setTab(2)}>
          MSA Typ 3
        </button>
        <button className={buttonStyle(tab, 3)} onClick={() => setTab(3)}>
          Prozessfähigkeit
        </button>
        <button className={buttonStyle(tab, 4)} onClick={() => setTab(4)}>
          Regelkarten
        </button>
      </div>
    </div>
  );
};

export default StickyHeader;
