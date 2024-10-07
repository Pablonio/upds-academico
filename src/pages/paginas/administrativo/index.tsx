import React, { useState } from 'react';
import CrearUsuario from './componentes/crearUsuarios';
import CrearCarrera from './componentes/crearCarrera';
import CrearProfesion from './componentes/crearProfesion';
import CrearSemestre from './componentes/crearSemestre';
import CrearMateria from './componentes/crearMateria';

const Administracion: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // Estado para el sidebar en móviles

  const handleMenuClick = (component: string) => {
    setActiveComponent(component);
    setIsSidebarOpen(false); // Cerrar el sidebar en móviles al seleccionar un componente
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Abrir o cerrar el sidebar
  };

  return (
    <div className="flex min-h-screen bg-black text-gray-100">
      {/* Sidebar */}
      <nav
        className={`bg-gray-900 p-4 fixed lg:static lg:block lg:w-64 h-full z-50 transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Administración</h1>
        <ul>
          <li>
            <button
              className="w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mb-2"
              onClick={() => handleMenuClick('crearUsuarios')}
            >
              Usuarios
            </button>
          </li>
          <li>
            <button
              className="w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mb-2"
              onClick={() => handleMenuClick('crearCarrera')}
            >
              Carrera
            </button>
          </li>
          <li>
            <button
              className="w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mb-2"
              onClick={() => handleMenuClick('crearProfesion')}
            >
              Profesión
            </button>
          </li>
          <li>
            <button
              className="w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mb-2"
              onClick={() => handleMenuClick('crearSemestre')}
            >
              Semestre
            </button>
          </li>
          <li>
            <button
              className="w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mb-2"
              onClick={() => handleMenuClick('crearMateria')}
            >
              Materia
            </button>
          </li>
        </ul>
      </nav>

      {/* Botón para abrir/cerrar el menú en móviles */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleSidebar}
          className="text-gray-100 bg-gray-700 p-4 rounded-full shadow-lg focus:outline-none"
        >
          {isSidebarOpen ? 'Cerrar Menú' : 'Abrir Menú'}
        </button>
      </div>

      <div className="flex-grow p-6 lg:ml-64">
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
