import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

// icons
import { BiSolidUser } from "react-icons/bi";
import { BiExit } from "react-icons/bi";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidCart } from "react-icons/bi";
import { IoMdArrowDropleft } from "react-icons/io";

const listNav = [
  { name: "Dashboard", route: "/", icon: <MdSpaceDashboard size={18} /> },
  {
    name: "Projects",
    route: "/projects",
    icon: <BiSolidPieChartAlt2 size={18} />,
  },
  {
    name: "Claims",
    route: "/claims",
    icon: <FaMoneyCheckDollar size={18} />,
  },
  {
    name: "Procurement",
    route: "/procurement",
    icon: <BiSolidCart size={18} />,
  },
];

function Sidebar() {
  return (
    <div className="flex flex-col w-[15rem] h-screen fixed border-r-2 border-gray-200">
      <div className="flex flex-row items-center border-b border-gray-200 h-[5rem]">
        <div className="flex justify-center items-center absolute w-[1.3rem] h-[1.3rem] border-2 border-gray-100 rounded-full bg-white -right-2 drop-shadow-md cursor-pointer hover:bg-purple-200 hover:text-white">
          <IoMdArrowDropleft size={15} />
        </div>
        <img src="/img/aspen.png" alt="" className={`w-[3rem] h-[3rem]`} />
        <p className="text-[1rem] text-blue-300 font-medium">
          Aspen Spectra PMO
        </p>
      </div>
      <div className="flex flex-col p-2 gap-y-1">
        {listNav.map((item, key) => (
          <NavLink
            key={key}
            to={item.route}
            className={({ isActive }) =>
              `flex flex-row items-center gap-x-2 px-4 py-2  text-blue-300 text-p font-medium rounded-md hover:bg-purple-100 duration-100 ease-in-out ${
                isActive &&
                "bg-purple-200 text-white hover:bg-purple-200 drop-shadow-purple-200"
              }`
            }
          >
            {item.icon}
            <span className={``}>{item.name}</span>
          </NavLink>
        ))}
      </div>
      <div></div>
    </div>
  );
}

export default Sidebar;
