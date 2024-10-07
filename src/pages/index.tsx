import React, { useState } from "react";
import LoginModal from "@/pages/paginas/Componentes/LoginModal";
import Carreras from "@/pages/paginas/Componentes/Carreras";
import Programaciones from "@/pages/paginas/Componentes/Programaciones";
import SolicitarMateria from "@/pages/paginas/estudiantes/Componentes/solicitarMateria"; // Importa el nuevo componente

const HomePage = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState<JSX.Element | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (component: JSX.Element) => {
    setCurrentComponent(component);
    setMenuOpen(false);
  };

  return (
    <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url(/images/background)" }}>
      <nav className="absolute top-0 left-0 w-full p-4 bg-opacity-50 bg-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Logo</h1>

          <button
            className="text-white sm:hidden block focus:outline-none"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          <ul className="hidden sm:flex space-x-4">
            <li>
              <button
                onClick={() =>
                  handleNavClick(
                    <div className="text-center text-white">
                      <h2 className="text-4xl font-bold mb-4">Bienvenidos a Solicitudes de Apertura de Materia</h2>
                      <p className="mb-8">Inicia sesión para llenar el formulario</p>
                    </div>
                  )
                }
                className="text-white hover:text-gray-300"
              >
                Inicio
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick(<Carreras />)} className="text-white hover:text-gray-300">
                Carreras
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick(<Programaciones />)} className="text-white hover:text-gray-300">
                Programaciones
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick(<SolicitarMateria />)} className="text-white hover:text-gray-300">
                Solicitar Materia
              </button>
            </li>
            <li>
              <button onClick={() => setLoginOpen(true)} className="text-white hover:text-gray-300">
                Iniciar Sesión
              </button>
            </li>
          </ul>
        </div>

        {isMenuOpen && (
          <ul className="sm:hidden mt-4 bg-gray-800 bg-opacity-90 p-4 rounded-lg space-y-4">
            <li>
              <button
                onClick={() =>
                  handleNavClick(
                    <div className="text-center text-white">
                      <h2 className="text-4xl font-bold mb-4">Bienvenidos a Solicitudes de Apertura de Materia</h2>
                      <p className="mb-8">Inicia sesión para llenar el formulario</p>
                    </div>
                  )
                }
                className="block text-white hover:text-gray-300"
              >
                Inicio
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick(<Carreras />)} className="block text-white hover:text-gray-300">
                Carreras
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick(<Programaciones />)} className="block text-white hover:text-gray-300">
                Programaciones
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick(<SolicitarMateria />)} className="block text-white hover:text-gray-300">
                Solicitar Materia
              </button>
            </li>
            <li>
              <button onClick={() => setLoginOpen(true)} className="block text-white hover:text-gray-300">
                Iniciar Sesión
              </button>
            </li>
          </ul>
        )}
      </nav>

      <div className="flex items-center justify-center h-full px-4">
        <div className="text-center text-white">{currentComponent}</div>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
};

export default HomePage;