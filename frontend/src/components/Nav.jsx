import { NavLink } from "react-router-dom"
import logo2 from "../assets/logo2.png"
import home from "../assets/home.svg";
import report from "../assets/report.svg";
import plus from "../assets/hexagon-plus.svg";
import minus from "../assets/hexagon-minus.svg";
import logout from "../assets/logout.svg"
import { toast, Toaster } from 'sonner'
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate()

  const confirmToast = () =>
    toast.custom((t) => (
      <div className="bg-[#EF8410] text-white w-full text-sm md:text-[16px] px-4 py-3 rounded-lg shadow-lg flex items-center justify-between max-w-sm">
        <div>
          <p className="font-medium">
            ¿Está seguro de cerrar sesión?
          </p>
        </div>
        <div className="ml-4 flex flex-col gap-2 w-[140px]">
          <button
            className="bg-white text-[#EF8410] px-3 py-1 rounded-md font-semibold"
            onClick={() => {
              // Limpiar localStorage
              localStorage.removeItem('token');
              localStorage.removeItem('userType');

              toast.success("Sesión cerrada correctamente", {
                style: {backgroundColor: "#fff", color : "#01578f", borderColor: "#01578f", fontSize: "16px"},
              });

              toast.dismiss(t.id);
              setTimeout(() => {
                navigate('/inicio-sesion', { replace: true });
              }, 2000);
            }}
          >
            Confirmar
          </button>
          <button
            className="text-white border border-white px-3 py-1 rounded-md font-semibold hover:bg-white hover:text-[#EF8410] transition"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancelar
          </button>
        </div>
      </div>
  ));

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
        <div onClick={()=> confirmToast()} className="cursor-pointer flex flex-col md:flex-row md:gap-1 justify-center items-center">
          <img src={logout} alt="logout" className="w-6 md:w-7"/>
          <p className="font-medium text-xs md:text-base text-center">Cerrar sesión</p>
        </div> 
        {/* hacer funcion logout */}
      </ul>
      <div>
        <img src={logo2} alt="logo" className="w-16 md:w-28"/>
        <Toaster richColors />
      </div>
    </nav>
  )
}

export default Nav;