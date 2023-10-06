import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

/*
    Accordian Items
*/

const AccordianItem = ({
  title,
  description,
  handleSetVisibleNumber,
  visible,
  index,
}) => {
  return (
    <>
      <div className="w-full flex justify-center flex-col">
        <button
          className={`${
            visible
              ? "text-blue-700 transition-all duration-700 "
              : " text-gray-500 "
          } px-3 flex min-h-[50px] items-center  font-medium text-lg  justify-between hover:bg-slate-100`}
          onClick={() => handleSetVisibleNumber(index)}
        >
          <span>{title}</span>
          <IoIosArrowDown
            className={`${
              visible ? "rotate-180" : "rotate-0"
            } transition-all duration-300`}
          />
        </button>
        {visible ? (
          <>
            <hr />
          </>
        ) : (
          ""
        )}
        <p
          className={`${
            visible ? "max-h-[500px] py-3 opacity-100" : "max-h-0 opacity-0"
          } px-3 bg-gray-50 text-gray-600 text-justify shadow-md transition-all duration-700 overflow-hidden`}
        >
          {description}
        </p>
      </div>
    </>
  );
};

/* 
    Accordian Object
*/

const accordianObject = [
  {
    title: "Was ist eine Messsystemanalyse – msa Typ 1?",
    description:
      "Die Messsystemanalyse – msa Typ 1 ist eine Methode zur Bewertung und Überwachung der Genauigkeit und Zuverlässigkeit von Messsystemen. Sie identifiziert systematische Abweichungen von Messungen und ermöglicht die Optimierung von Messprozessen.",
  },
  {
    title: "Warum ist die Messsystemanalyse wichtig?",
    description:
      "Die Messsystemanalyse ist wichtig, weil sie sicherstellt, dass Messungen zuverlässig und genau sind. Dies ist entscheidend für die Qualität von Produkten und Prozessen.",
  },
  {
    title:
      "Bietet QM-Datalab ein kostenloses Analyse Tool für die Messsystemanalyse Typ 1?",
    description:
      "Ja, QM-Datalab bietet ein kostenloses Analyse Tool für die Messsystemanalyse Typ 1. Du kannst deine Messdaten einfach online eingeben und das Tool erstellt Analysen, Kennwerte und Diagramme für dich.",
  },
  {
    title:
      "Welche Kenngrößen sind in der Messsystemanalyse Typ 1 besonders relevant?",
    description:
      "In der Messsystemanalyse Typ 1 sind die Kenngrößen Cg und Cgk besonders relevant. Sie ermöglichen eine präzise Beurteilung der Leistung des Messsystems.",
  },
  {
    title:
      "Wie hilft die Messsystemanalyse Typ 1 bei der Qualitätssteigerung?    ",
    description:
      "Die Messsystemanalyse Typ 1 hilft bei der Qualitätssteigerung, indem sie systematische Abweichungen von Messungen identifiziert und es ermöglicht, diese zu korrigieren. Dadurch werden Genauigkeit und Zuverlässigkeit der Messungen verbessert.",
  },
];

/* 
    Accordian 
*/

const FAQ = () => {
  const [visibleNumber, setVisibleNumber] = useState(-1);

  const handleSetVisibleNumber = (accordianItemNumber) => {
    if (accordianItemNumber == visibleNumber) {
      setVisibleNumber(-1);
    } else {
      setVisibleNumber(accordianItemNumber);
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow-xl">
      {accordianObject.map((e, i) => {
        return (
          <>
            <AccordianItem
              key={i}
              {...e}
              handleSetVisibleNumber={handleSetVisibleNumber}
              visible={visibleNumber == i}
              index={i}
            />
            {i !== accordianObject.length - 1 ? (
              <hr className="border border-gray-200" />
            ) : (
              ""
            )}
          </>
        );
      })}
    </div>
  );
};

export default FAQ;
