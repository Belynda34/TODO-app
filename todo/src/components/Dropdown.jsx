import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Dropdown = () => {
  return (
    <details className="dropdown">
      <summary className="btn m-3 gap-6 bg-violet-600 text-white  hover:bg-violet-600">
        ALL <MdKeyboardArrowDown className="text-lg" />{" "}
      </summary>
      <ul className="menu dropdown-content bg-white text-gray-400 font-semibold rounded-box z-[1] w-52 p-2">
        <li>
          <a>ALL</a>
        </li>
        <li>
          <a>INCOMPLETE</a>
        </li>
        <li>
          <a>COMPLETE</a>
        </li>
      </ul>
    </details>
  );
};

export default Dropdown;
