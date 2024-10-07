import React, { useState } from 'react';
import CrearUsuario from './componentes/crearUsuarios';
import CrearCarrera from './componentes/crearCarrera';
import CrearProfesion from './componentes/crearProfesion';
import CrearSemestre from './componentes/crearSemestre';

const Administracion: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("");

  const handleMenuClick = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-black text-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center">Administración</h1>

      <nav className="bg-gray-900 p-4 rounded mb-4">
        <button 
          className="ml-4 text-left pl-2 w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200" 
          onClick={() => handleMenuClick(activeComponent === 'usuarios' ? '' : 'usuarios')}
        >
          Usuarios
        </button>

        {activeComponent === 'usuarios' && (
          <div className="pl-8">
            <button 
              className="block text-left py-2 hover:bg-gray-700 bg-gray-800 rounded text-gray-300 mt-2"
              onClick={() => handleMenuClick('crearUsuarios')}
            >
              Crear Usuario
            </button>
          </div>
        )}

        <button 
          className="ml-4 text-left w-full pl-2 py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mt-4" 
          onClick={() => handleMenuClick(activeComponent === 'carrera' ? '' : 'carrera')}
        >
          Carrera
        </button>

        {activeComponent === 'carrera' && (
          <div className="pl-8">
            <button 
              className="block text-left py-2 hover:bg-gray-700 bg-gray-800 rounded text-gray-300 mt-2"
              onClick={() => handleMenuClick('crearCarrera')}
            >
              Crear carrera
            </button>
          </div>
        )}

        <button 
          className="ml-4 text-left pl-2 w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mt-4" 
          onClick={() => handleMenuClick(activeComponent === 'profesion' ? '' : 'profesion')}
        >
          Profesión
        </button>

        {activeComponent === 'profesion' && (
          <div className="pl-8">
            <button 
              className="block text-left pl-2 py-2 hover:bg-gray-700 bg-gray-800 rounded text-gray-300 mt-2"
              onClick={() => handleMenuClick('crearProfesion')}
            >
              Crear Profesión
            </button>
          </div>
        )}
        <button 
          className="ml-4 text-left pl-2 w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mt-4" 
          onClick={() => handleMenuClick(activeComponent === 'semestre' ? '' : 'semestre')}
        >
          Semestre
        </button>

        {activeComponent === 'semestre' && (
          <div className="pl-8">
            <button 
              className="block text-left pl-2 py-2 hover:bg-gray-700 bg-gray-800 rounded text-gray-300 mt-2"
              onClick={() => handleMenuClick('crearSemestre')}
            >
              Crear Semestre
            </button>
          </div>
        )}
        <button 
          className="ml-4 text-left pl-2 w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mt-4" 
          onClick={() => handleMenuClick(activeComponent === 'materia' ? '' : 'materia')}
        >
          Materia
        </button>

        {activeComponent === 'materia' && (
          <div className="pl-8">
            <button 
              className="block text-left pl-2 py-2 hover:bg-gray-700 bg-gray-800 rounded text-gray-300 mt-2"
              onClick={() => handleMenuClick('crearMateria')}
            >
              Crear Materia
            </button>
          </div>
        )}
      </nav>

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {activeComponent === 'crearUsuarios' && <CrearUsuario/>}
        {activeComponent === 'crearCarrera' && <CrearCarrera/>}
        {activeComponent === 'crearProfesion' && <CrearProfesion/>}
        {activeComponent === 'crearSemestre' && <CrearSemestre/>}
        {activeComponent === 'crearMateria' && <CrearMateriah/>}
      </div>
    </div>
  );
};

export default Administracion;
