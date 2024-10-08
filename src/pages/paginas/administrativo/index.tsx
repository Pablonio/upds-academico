
//  Administracion;

import React, { useState } from 'react';
import {motion} from 'framer-motion'
import CrearUsuario from './componentes/crearUsuarios';
import CrearCarrera from './componentes/crearCarrera';
import CrearProfesion from './componentes/crearProfesion';
import CrearSemestre from './componentes/crearSemestre';
import CrearMateria from './componentes/crearMateria';
import PanelResultados from '../Componentes/PanelResultados';
import Image from 'next/image';

const Dashboard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("");

  const handleMenuClick = (component: string) => {
    setActiveComponent(component);
  };
  // Definir el estado para controlar la apertura del dropdown
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // Función para alternar la apertura del dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
    {/* Sidebar */}
    <aside className="w-full md:w-1/4 text-gray-100 flex flex-col  bg-[url('/images/fondo.jpg')] ">
      <div className="py-4 bg-slate-950 flex justify-between items-center px-6">
        <Image 
          src="/images/universidad.ico"
          width={50}
          height={50}
          alt="logo"
        />
        <h1 className="text-2xl pl-3 font-semibold">UPDS</h1>
        <button className="md:hidden text-gray-100" onClick={toggleDropdown}>
          ☰
        </button>
      </div>
      
      <nav className={`flex justify-center md:flex ${dropdownOpen ? 'block' : 'hidden'}`}>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center w-full"
        >
          <li className="w-4/5 my-2">
            <button
              className="p-4 w-full font-semibold bg-blue-950 hover:bg-slate-900 rounded-xl text-gray-200"
              onClick={() => handleMenuClick('crearUsuarios')}
            >
              Usuarios
            </button>
          </li>
          <li className="w-4/5 my-2">
            <button
              className="p-4 w-full font-semibold bg-blue-950 hover:bg-slate-900 rounded-xl text-gray-200"
              onClick={() => handleMenuClick('crearCarrera')}
            >
              Carrera
            </button>
          </li>
          <li className="w-4/5 my-2">
            <button
              className="p-4 w-full font-semibold bg-blue-950 hover:bg-slate-900 rounded-xl text-gray-200"
              onClick={() => handleMenuClick('crearMateria')}
            >
              Materia
            </button>
          </li>
          <li className="w-4/5 my-2">
            <button
              className="p-4 w-full font-semibold bg-blue-950 hover:bg-slate-900 rounded-xl text-gray-200"
              onClick={() => handleMenuClick('crearProfesion')}
            >
              Profesion
            </button>
          </li>
          <li className="w-4/5 my-2">
            <button
              className="p-4 w-full font-semibold bg-blue-950 hover:bg-slate-900 rounded-xl text-gray-200"
              onClick={() => handleMenuClick('crearSemestre')}
            >
              Semestre  
            </button>
          </li>
          <li className="w-4/5 my-2">
            <button
              className="p-4 w-full font-semibold bg-blue-950 hover:bg-slate-900 rounded-xl text-gray-200"
              onClick={() => handleMenuClick('PanelResultados')}
            >
              Vista de Registros 
            </button>
          </li>
        </motion.ul>
      </nav>
    </aside>
  
    {/* Main Content */}
    <div className="flex-1 p-6 bg-slate-900">
      <header className="justify-between items-center bg-[url('/images/navbar.jpg')] py-2 m-0 hidden md:flex">
        <h2 className="text-2xl p-5 font-semibold">ADMINISTRACION</h2>
        <div>
          <a href="./dashboard">Perfil de usuario</a>
        </div>
      </header>
  
      <div className="mt-6">
        {/* Contenido condicional */}
        <div className="flex flex-col items-center justify-center flex-grow p-6 lg:p-8">
          {activeComponent === 'crearUsuarios' && <CrearUsuario />}
          {activeComponent === 'crearCarrera' && <CrearCarrera />}
          {activeComponent === 'crearProfesion' && <CrearProfesion />}
          {activeComponent === 'crearSemestre' && <CrearSemestre />}
          {activeComponent === 'crearMateria' && <CrearMateria />}
          {activeComponent === 'PanelResultados' && <PanelResultados />}
        </div>
      </div>
    </div>
  </div>
  

  );
};

export default Dashboard;















