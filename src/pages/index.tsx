
// import React, { useState } from "react";
// import LoginModal from "@/pages/paginas/Componentes/LoginModal";
// import Carreras from "@/pages/paginas/Componentes/Carreras";
// import Programaciones from "@/pages/paginas/Componentes/Programaciones";
// import SolicitarMateria from "@/pages/paginas/estudiantes/Componentes/solicitarMateria"; // Importa el nuevo componente

// const HomePage = () => {
//   const [isLoginOpen, setLoginOpen] = useState(false);
//   const [currentComponent, setCurrentComponent] = useState<JSX.Element | null>(null);
//   const [isMenuOpen, setMenuOpen] = useState(false);

//   const handleNavClick = (component: JSX.Element) => {
//     setCurrentComponent(component);
//     setMenuOpen(false);
//   };

//   return (
//     <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url(/images/background)" }}>
//       <nav className="absolute top-0 left-0 w-full p-4 bg-opacity-50 bg-gray-800">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-white text-2xl font-bold">Logo</h1>

//           <button
//             className="text-white sm:hidden block focus:outline-none"
//             onClick={() => setMenuOpen(!isMenuOpen)}
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//             </svg>
//           </button>

//           <ul className="hidden sm:flex space-x-4">
//             <li>
//               <button
//                 onClick={() =>
//                   handleNavClick(
//                     <div className="text-center text-white">
//                       <h2 className="text-4xl font-bold mb-4">Bienvenidos a Solicitudes de Apertura de Materia</h2>
//                       <p className="mb-8">Inicia sesión para llenar el formulario</p>
//                     </div>
//                   )
//                 }
//                 className="text-white hover:text-gray-300"
//               >
//                 Inicio
//               </button>
//             </li>
//             <li>
//               <button onClick={() => handleNavClick(<Carreras />)} className="text-white hover:text-gray-300">
//                 Carreras
//               </button>
//             </li>
//             <li>
//               <button onClick={() => handleNavClick(<Programaciones />)} className="text-white hover:text-gray-300">
//                 Programaciones
//               </button>
//             </li>
//             <li>
//               <button onClick={() => handleNavClick(<SolicitarMateria />)} className="text-white hover:text-gray-300">
//                 Solicitar Materia
//               </button>
//             </li>
//             <li>
//               <button onClick={() => setLoginOpen(true)} className="text-white hover:text-gray-300">
//                 Iniciar Sesión
//               </button>
//             </li>
//           </ul>
//         </div>

//         {isMenuOpen && (
//           <ul className="sm:hidden mt-4 bg-gray-800 bg-opacity-90 p-4 rounded-lg space-y-4">
//             <li>
//               <button
//                 onClick={() =>
//                   handleNavClick(
//                     <div className="text-center text-white">
//                       <h2 className="text-4xl font-bold mb-4">Bienvenidos a Solicitudes de Apertura de Materia</h2>
//                       <p className="mb-8">Inicia sesión para llenar el formulario</p>
//                     </div>
//                   )
//                 }
//                 className="block text-white hover:text-gray-300"
//               >
//                 Inicio
//               </button>
//             </li>
//             <li>
//               <button onClick={() => handleNavClick(<Carreras />)} className="block text-white hover:text-gray-300">
//                 Carreras
//               </button>
//             </li>
//             <li>
//               <button onClick={() => handleNavClick(<Programaciones />)} className="block text-white hover:text-gray-300">
//                 Programaciones
//               </button>
//             </li>
//             <li>
//               <button onClick={() => handleNavClick(<SolicitarMateria />)} className="block text-white hover:text-gray-300">
//                 Solicitar Materia
//               </button>
//             </li>
//             <li>
//               <button onClick={() => setLoginOpen(true)} className="block text-white hover:text-gray-300">
//                 Iniciar Sesión
//               </button>
//             </li>
//           </ul>
//         )}
//       </nav>

//       <div className="flex items-center justify-center h-full px-4">
//         <div className="text-center text-white">{currentComponent}</div>
//       </div>

//       <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
//     </div>
//   );
// };

// export default HomePage;


import React, { useState,useEffect } from "react";
import LoginModal from "@/pages/paginas/Componentes/LoginModal"; // Asegúrate de importar el componente
import Carreras from "@/pages/paginas/Componentes/Carreras"; // Importa tu componente de Carreras
import Programaciones from "@/pages/paginas/Componentes/Programaciones"; // Importa tu componente de Programaciones
import SolicitarMateria from "@/pages/paginas/estudiantes/Componentes/solicitarMateria"; // Importa el nuevo componente
import Image from "next/image";
import {motion} from "framer-motion";
import ImageSlider from '@/pages/paginas/Componentes/ImageSlider'

const HomePage = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState<JSX.Element | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú

  useEffect(() => {
    setCurrentComponent(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
    <div className="relative top-0 left-0 w-full h-full z-0 flex flex-col items-center justify-center text-center text-white">
      <h2 className="text-5xl font-bold mb-4">Bienvenidos a Solicitudes de Apertura de Materia</h2>
      <p className="mb-5 text-3xl text-violet-100">Inicia sesión para poder llenar el formulario de Solicitudes</p>
      <Image
        src="/images/asignacion.png"
        width={300}
        height={300}
        alt="Logo"
        className="w-full max-w-lg max-h-80 object-contain"
      />
    </div>
    </motion.div>
    );
  }, []);

  const handleNavClick = (component: JSX.Element) => {
    setCurrentComponent(component);
    setMenuOpen(false); // Cierra el menú después de hacer clic en una opción
  };

  return (
  <div className="relative h-screen">  
    <div className="relative bg-cover bg-center h-screen">
    <div className="absolute inset-0 bg-cover bg-center bg-[url('/images/background.jpg')] opacity-30"></div>
      <nav className="absolute top-0 left-0 w-full p-4 bg-opacity-90 bg-slate-900">
        <div className="container mx-auto flex justify-between items-center">
          
          {/* Logo y Nombre en Columna Centrado */}
          <div className="flex flex-col items-center text-center">
            <Image src="/images/universidad.ico" width={60} height={70} alt="Logo" />
            <h1 className="text-white text-1xl font-bold">Universidad SD</h1>
          </div>
          
          {/* Botón del menú hamburguesa para móviles */}
          <button
            className="text-white sm:hidden block focus:outline-none"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Menú de navegación - Se oculta en móviles */}
          <ul className="hidden sm:flex space-x-4">
            <li>
              <button
                onClick={() => handleNavClick(
                  
                  <div className="text-center w-screen text-white">
                    <div className="w-screen flex justify-center items-center">
                      <ImageSlider/>
                    </div>
                    <h2 className="text-4xl pt-10 font-bold mb-4">Disfruta de la mejor experiencia junto a ...</h2>
                    <motion.h1
                    className="mb-8  text-5xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    >
                    <h1 className="font-bold">Flox</h1>
                    </motion.h1>
                  </div>
                )}
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
            {/* Botón de Iniciar Sesión con borde azul y animación */}
            <li>
              <button
                onClick={() => setLoginOpen(true)}
                className="text-white border-2 border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out"
              >
                Iniciar Sesión
              </button>
            </li>
          </ul>
        </div>

        {/* Menú desplegable en móviles */}
        {isMenuOpen && (
          <ul className="sm:hidden mt-4 bg-gray-800 bg-opacity-90 p-4 rounded-lg space-y-4">
            <li>
              <button
                onClick={() => handleNavClick(
                  <div className="text-center text-white">
                    <h2 className="text-4xl font-bold mb-4">Bienvenidos a Solicitudes de Apertura de Materia</h2>
                    <p className="mb-8">Inicia sesión para llenar el formulario</p>
                  </div>
                )}
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
              <button onClick={() => setLoginOpen(true)} className="block text-white border-2 border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out">
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
  </div>
  );
};



export default HomePage;
