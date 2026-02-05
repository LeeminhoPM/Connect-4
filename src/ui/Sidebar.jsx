import {
  IoGameController,
  IoGameControllerOutline,
  IoHome,
  IoHomeOutline,
} from "react-icons/io5";
import { LuAlignJustify } from "react-icons/lu";
import {
  PiRanking,
  PiRankingFill,
} from "react-icons/pi";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar({ onChangeNav, isOpenNav }) {
  const location = useLocation();
  const styleLink =
    "flex items-center gap-[20px] px-3 py-[10px] hover:bg:bg hover:bg-bg font-[400] hover:font-[500] hover:bg-gray-100 hover:rounded-[10px] cursor-pointer";
  return (
    <nav className="flex flex-col py-4 pl-3">
      <div className="flex">
        <div
          onClick={() => onChangeNav()}
          className="mr-2 p-3 rounded-full hover:bg-gray-200 cursor-pointer"
        >
          <LuAlignJustify className="w-6 h-6 text-[0px]" />
        </div>
        {isOpenNav && <p className="text-center">BUẦN CỦA TÂN VŨ</p>}
      </div>
      <ul className="py-5">
        <li>
          <NavLink
            className={({ isActive }) =>
              `${styleLink} ${
                isActive ? "bg-gray-100 font-medium rounded-[10px]" : ""
              }`
            }
            to="/"
          >
            <span>
              {location.pathname === "/" ? (
                <IoHome className="size--icon" />
              ) : (
                <IoHomeOutline className="size--icon" />
              )}
            </span>
            {isOpenNav && <p>Trang chủ</p>}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `${styleLink} ${
                isActive ? "bg-gray-100 font-medium rounded-[10px]" : ""
              }`
            }
            to="/rank"
          >
            <span>
              {location.pathname === "/rank" ? (
                <PiRankingFill className="size--icon" />
              ) : (
                <PiRanking className="size--icon" />
              )}
            </span>
            {isOpenNav && <p>Bảng xếp hạng</p>}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `${styleLink} ${
                isActive ? "bg-gray-100 font-medium rounded-[10px]" : ""
              }`
            }
            to="/game"
          >
            <span>
              {location.pathname === "/game" ? (
                <IoGameController className="size--icon" />
              ) : (
                <IoGameControllerOutline className="size--icon" />
              )}
            </span>
            {isOpenNav && <p>Chơi game</p>}
          </NavLink>
        </li>
      </ul>
      {isOpenNav && (
        <footer className="mt-auto text-center text-[#717171] text-[12px]/[18px] font-normal">
          © 2025 Nhom12
        </footer>
      )}
    </nav>
  );
}

export default Sidebar;
