import React, { useState } from 'react';
import CrearUsuario from './componentes/crearUsuarios';
import CrearCarrera from './componentes/crearCarrera';
import CrearProfesion from './componentes/crearProfesion';
import CrearSemestre from './componentes/crearSemestre';
import CrearMateria from './componentes/crearMateria';

const Administracion: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false); // Estado para el sidebar en móviles

  const handleMenuClick = (component: string) => {
    setActiveComponent(component);
    setSidebarOpen(false); // Cerrar sidebar después de hacer clic en móviles
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Abrir o cerrar el sidebar en móviles
  };

  return (
    <div className="flex min-h-screen bg-black text-gray-100">
      {/* Botón de menú para móviles */}
      <div className="lg:hidden p-4 bg-gray-900 w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">Administración</h1>
        <button
          onClick={toggleSidebar}
          className="text-gray-100 bg-gray-700 p-2 rounded focus:outline-none"
        >
          {sidebarOpen ? 'Cerrar Menú' : 'Abrir Menú'}
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={`bg-gray-900 p-4 min-h-screen w-64 fixed z-50 lg:static lg:block ${
          sidebarOpen ? 'block' : 'hidden'
        } lg:w-64 lg:block`}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Administración</h1>
        <button 
          className=" text-left pl-2 w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200" 
          onClick={() => handleMenuClick(activeComponent === 'usuarios' ? '' : 'usuarios')}
        >
          Usuarios
        </button>

        {activeComponent === 'usuarios' && (
          <div className="pl-8">
            <button 
              className="block text-left p-2 hover:bg-gray-700 bg-gray-800 rounded text-gray-300 mt-2"
              onClick={() => handleMenuClick('crearUsuarios')}
            >
              Crear Usuario
            </button>
          </div>
        )}

        <button 
          className="text-left w-full pl-2 py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mt-4" 
          onClick={() => handleMenuClick(activeComponent === 'carrera' ? '' : 'carrera')}
        >
          Carrera
        </button>

        {activeComponent === 'carrera' && (
          <div className="pl-8">
            <button 
              className="block text-left p-2 hover:bg-gray-700 bg-gray-800 rounded text-gray-300 mt-2"
              onClick={() => handleMenuClick('crearCarrera')}
            >
              Crear Carrera
            </button>
          </div>
        )}

        <button 
          className="text-left pl-2 w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mt-4" 
          onClick={() => handleMenuClick(activeComponent === 'profesion' ? '' : 'profesion')}
        >
          Profesión
        </button>

        {activeComponent === 'profesion' && (
          <div className="pl-8">
            <button 
              className="block text-left p-2 py-2 hover:bg-gray-700 bg-gray-800 rounded text-gray-300 mt-2"
              onClick={() => handleMenuClick('crearProfesion')}
            >
              Crear Profesión
            </button>
          </div>
        )}

        <button 
          className="text-left pl-2 w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mt-4" 
          onClick={() => handleMenuClick(activeComponent === 'semestre' ? '' : 'semestre')}
        >
          Semestre
        </button>

        {activeComponent === 'semestre' && (
          <div className="pl-8">
            <button 
              className="block text-left p-2 py-2 hover:bg-gray-700 bg-gray-800 rounded text-gray-300 mt-2"
              onClick={() => handleMenuClick('crearSemestre')}
            >
              Crear Semestre
            </button>
          </div>
        )}

        <button 
          className="text-left pl-2 w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mt-4" 
          onClick={() => handleMenuClick(activeComponent === 'materia' ? '' : 'materia')}
        >
          Materia
        </button>

        {activeComponent === 'materia' && (
          <div className="pl-8">
            <button 
              className="block text-left p-2 py-2 hover:bg-gray-700 bg-gray-800 rounded text-gray-300 mt-2"
              onClick={() => handleMenuClick('crearMateria')}
            >
              Crear Materia
            </button>
          </div>
        )}
      </nav>

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-center flex-grow p-6 lg:p-8">
        {activeComponent === 'crearUsuarios' && <CrearUsuario />}
        {activeComponent === 'crearCarrera' && <CrearCarrera />}
        {activeComponent === 'crearProfesion' && <CrearProfesion />}
        {activeComponent === 'crearSemestre' && <CrearSemestre />}
        {activeComponent === 'crearMateria' && <CrearMateria />}
      </div>
    </div>
  );
};

export default Administracion;
