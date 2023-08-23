import React from "react";
import LOGO_URL from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="flex w-screen items-center px-20 py-6 bg-white">
      <div>
        <a href="https://www.qm-datalab.de" target="_blank">
          <img
            className="logo-image  max-h-[35px]  w-auto"
            src={LOGO_URL}
            alt="Logo"
            height={55}
            width={334}
          />
        </a>
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
