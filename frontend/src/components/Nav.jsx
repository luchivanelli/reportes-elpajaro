import { NavLink } from "react-router-dom"
import logo2 from "../assets/logo2.png"
import home from "../assets/home.svg";
import report from "../assets/report.svg";
import plus from "../assets/hexagon-plus.svg";
import minus from "../assets/hexagon-minus.svg";

const Nav = () => {
  return (
    <nav className="flex flex-col justify-between items-center py-4 md:py-6 border-r-2 border-[#ffffff3f] h-screen w-18 md:w-[220px]">
      <ul className="px-2 flex flex-col md:items-start gap-4 md:gap-6">
        <NavLink to={"/"} className={({ isActive }) =>
            `cursor-pointer flex flex-col md:flex-row md:gap-1 justify-center items-center 
            ${isActive ? "text-[#EF8410]" : "text-white"}`
          }>
          <img src={home} alt="" className="w-6 md:w-7"/>
          <p className="font-medium text-xs md:text-base text-center">Inicio</p>
        </NavLink>
        <NavLink to={"/reportes"} className={({ isActive }) =>
            `cursor-pointer flex flex-col md:flex-row md:gap-1 justify-center items-center 
            ${isActive ? "text-[#EF8410]" : "text-white"}`
          }>
          <img src={report} alt="" className="w-6 md:w-7"/>
          <p className="font-medium text-xs md:text-base text-center">Reportes</p>
        </NavLink>
        <NavLink to={"/agregar-ingreso"} className={({ isActive }) =>
            `cursor-pointer flex flex-col md:flex-row md:gap-1 justify-center items-center 
            ${isActive ? "text-[#EF8410]" : "text-white"}`
          }>
          <img src={plus} alt="" className="w-6 md:w-7"/>
          <p className="font-medium text-xs md:text-base text-center">Agregar ingreso</p>
        </NavLink>
        <NavLink to={"/agregar-egreso"} className={({ isActive }) =>
            `cursor-pointer flex flex-col md:flex-row md:gap-1 justify-center items-center 
            ${isActive ? "text-[#EF8410]" : "text-white"}`
          }>
          <img src={minus} alt="" className="w-6 md:w-7"/>
          <p className="font-medium text-xs md:text-base text-center">Agregar egreso</p>
        </NavLink>
      </ul>
      <img src={logo2} alt="logo" className="w-16 md:w-28"/>
    </nav>
  )
}

export default Nav;