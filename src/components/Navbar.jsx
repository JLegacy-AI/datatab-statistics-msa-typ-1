import React from "react";
import LOGO_URL from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="flex w-screen items-center px-20 py-6 bg-white">
      <div>
        <img className="h-8 min-w-[100px]" src={LOGO_URL} alt="Logo" />
      </div>
      <div className="flex-1 flex justify-center items-center px-20 font-semibold">
        Datenanalysen fürs Qualitätsmanagement
      </div>
      <ul className="flex gap-6 text-gray-600">
        <li>
          <a
            className="hover:text-blue-700 transition-all duration-500"
            href="mailto:info@qm-datalab.de"
          >
            Mail: info@qm-datalab.de
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
