import { FaLinkedinIn, FaGithub, FaFileDownload } from "react-icons/fa"
import { FiMenu } from "react-icons/fi"
import { BsPersonCircle } from "react-icons/bs"
import logoNavbar from "../assets/logoNavbar.png"

import { Outlet, Link } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <nav className="bg-black w-[100%] h-18 flex px-3 gap-3 items-center justify-between  text-[0.7rem] min-[375px]:text-lg sm:text-2xl md:text-4xl">
        <Link to="/"><img className="w-[4rem] min-[400px]:w-[5rem] sm:w-[8rem]" src={logoNavbar} alt="logo" /></Link>
        <div className="flex gap-1 min-[400px]:gap-2 sm:gap-8">
          <Link to="/training" className="hover:scale-105">treinar</Link>
          <Link to="/exercises" className="hover:scale-105">exercícios</Link>
          <Link to="/training" className="hover:scale-105">semana</Link>
          <Link to="/training" className="hover:scale-105">nutrição</Link>
        </div>
        <div className="hover:scale-105 bg-[#FFB703] rounded-2xl w-[3.5rem] sm:w-[5rem] px-1 flex items-center justify-evenly cursor-pointer">
          <span><FiMenu stroke="#121212" className="w-5 sm:w-5" /> </span>
          <BsPersonCircle fill="#121212" size={30} className=" w-9 sm:w-12" />
        </div>
      </nav >

      <Outlet />

      <footer className="px-3 py-1 w-[100%] overflow-x-hidden flex items-center justify-between gap-5 border-t border-[#454545] text-md md:text-xl">
        Feito por Ivan Lima com React
        <div className="flex gap-5 ">
          <Link to="https://www.linkedin.com/in/ivan-lima-dev/" target="_blank">< FaLinkedinIn /></Link >
          <Link to="https://github.com/ivanlima096" target="_blank">< FaGithub /></Link >
          <Link to="https://drive.google.com/file/d/1wEXAyjiYbv0yeUiVuH0xJaLoO9mue3GC/view?usp=drive_link" target="_blank">< FaFileDownload /></Link >
        </div>
      </footer>
    </>
  )
}