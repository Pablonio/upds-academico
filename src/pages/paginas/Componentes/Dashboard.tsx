// import React, { useState } from 'react';
// import CrearUsuario from '@/pages/paginas/administrativo/componentes/crearUsuarios';
// import CrearCarrera from '@/pages/paginas/administrativo/componentes/crearCarrera';
// import CrearProfesion from '@/pages/paginas/administrativo/componentes/crearProfesion';
// import CrearSemestre from '@/pages/paginas/administrativo/componentes/crearSemestre';


// const Administracion: React.FC = () => {
//   const [activeComponent, setActiveComponent] = useState<string>("");

//   const handleMenuClick = (component: string) => {
//     setActiveComponent(component);
//   };

//   return (
    
//     <div className="relative mx-auto w-screen min-h-screen text-gray-100 bg-cover bg-center h-screen bg-[url('/img/background.jpg')]">
    
//       <h1 className="text-2xl font-bold mb-4 text-center">Administración</h1>

//       <nav className="bg-gray-900 p-4 rounded mb-4">
//         <button 
//           className="ml-4 text-left pl-2 w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200" 
//           onClick={() => handleMenuClick(activeComponent === 'usuarios' ? '' : 'usuarios')}
//         >
//           Usuarios
//         </button>

//         {activeComponent === 'usuarios' && (
//           <div className="pl-8">
//             <button 
//               className="block text-left py-2 hover:bg-gray-700 bg-gray-800 rounded text-gray-300 mt-2"
//               onClick={() => handleMenuClick('crearUsuarios')}
//             >
//               Crear Usuario
//             </button>
//           </div>
//         )}

//         <button 
//           className="ml-4 text-left w-full pl-2 py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mt-4" 
//           onClick={() => handleMenuClick(activeComponent === 'carrera' ? '' : 'carrera')}
//         >
//           Carrera
//         </button>

//         {activeComponent === 'carrera' && (
//           <div className="pl-8">
//             <button 
//               className="block text-left py-2 hover:bg-gray-700 bg-gray-800 rounded text-gray-300 mt-2"
//               onClick={() => handleMenuClick('crearCarrera')}
//             >
//               Crear carrera
//             </button>
//           </div>
//         )}

//         <button 
//           className="ml-4 text-left pl-2 w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mt-4" 
//           onClick={() => handleMenuClick(activeComponent === 'profesion' ? '' : 'profesion')}
//         >
//           Profesión
//         </button>

//         {activeComponent === 'profesion' && (
//           <div className="pl-8">
//             <button 
//               className="block text-left pl-2 py-2 hover:bg-gray-700 bg-gray-800 rounded text-gray-300 mt-2"
//               onClick={() => handleMenuClick('crearProfesion')}
//             >
//               Crear Profesión
//             </button>
//           </div>
//         )}
//         <button 
//           className="ml-4 text-left pl-2 w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mt-4" 
//           onClick={() => handleMenuClick(activeComponent === 'semestre' ? '' : 'semestre')}
//         >
//           Semestre
//         </button>

//         {activeComponent === 'semestre' && (
//           <div className="pl-8">
//             <button 
//               className="block text-left pl-2 py-2 hover:bg-gray-700 bg-gray-800 rounded text-gray-300 mt-2"
//               onClick={() => handleMenuClick('crearSemestre')}
//             >
//               Crear Semestre
//             </button>
//           </div>
//         )}
//         <button 
//           className="ml-4 text-left pl-2 w-full py-2 font-semibold bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 mt-4" 
//           onClick={() => handleMenuClick(activeComponent === 'materia' ? '' : 'materia')}
//         >
//           Materia
//         </button>

//         {activeComponent === 'materia' && (
//           <div className="pl-8">
//             <button 
//               className="block text-left pl-2 py-2 hover:bg-gray-700 bg-gray-800 rounded text-gray-300 mt-2"
//               onClick={() => handleMenuClick('crearMateria')}
//             >
//               Crear Materia
//             </button>
//           </div>
//         )}
//       </nav>

//       <div className="flex flex-col items-center justify-center min-h-screen p-4">
//         {activeComponent === 'crearUsuarios' && <CrearUsuario/>}
//         {activeComponent === 'crearCarrera' && <CrearCarrera/>}
//         {activeComponent === 'crearProfesion' && <CrearProfesion/>}
//         {activeComponent === 'crearSemestre' && <CrearSemestre/>}
//         {activeComponent === 'crearMateria' && <CrearMateria/>}
//       </div>
//     </div>
//   );
// };

// export default Administracion;



import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import the component for 'Usuarios'
const CrearUsuarios = dynamic(() => import('@/pages/paginas/administrativo/componentes/crearUsuarios'));
const CrearCarrera = dynamic(() => import('@/pages/paginas/administrativo/componentes/crearCarrera'));
const CrearMateria = dynamic(() => import('@/pages/paginas/administrativo/componentes/crearMateria'));
const CrearProfesion = dynamic(() => import('@/pages/paginas/administrativo/componentes/crearProfesion'));
const CrearSemestre = dynamic(() => import('@/pages/paginas/administrativo/componentes/crearSemestre'));

const Dashboard: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("");

  const handleMenuClick = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-blue-900 text-gray-100 flex flex-col">
        <div className="py-4 bg-blue-950 flex justify-center items-center px-6">
          <Image 
              src="/img/universidad.ico"
              width={50}
              height={50}
              alt= "logo"
              />
          <h1 className="text-2xl font-semibold">Registros</h1>
        </div>
        <nav className="flex-1">
          <ul>
            <li className="px-6 py-2 hover:bg-blue-300">
              <button
                className="ml-4 text-left pl-2 w-full py-2 font-semibold bg-blue-950 hover:bg-slate-950 rounded-md text-gray-200"
                onClick={() => handleMenuClick('usuarios')}
              >
                Usuarios
              </button>
            </li>
            <li className="px-6 py-2 hover:bg-blue-300">
              <button
                className="ml-4 text-left w-full pl-2 py-2 font-semibold bg-blue-950 hover:bg-slate-950 rounded-md text-gray-200 mt-4"
                onClick={() => handleMenuClick('carrera')}
              >
                Carrera
              </button>
            </li>
            <li className="px-6 py-2 hover:bg-blue-300">
              <button
                className="ml-4 text-left w-full pl-2 py-2 font-semibold bg-blue-950 hover:bg-slate-950 rounded-md text-gray-200 mt-4"
                onClick={() => handleMenuClick('materia')}
              >
                Materia
              </button>
            </li>
            <li className="px-6 py-2 hover:bg-blue-300">
              <button
                className="ml-4 text-left w-full pl-2 py-2 font-semibold bg-blue-950 hover:bg-slate-950 rounded-md text-gray-200 mt-4"
                onClick={() => handleMenuClick('profesion')}
              >
                Profesion
              </button>
            </li>
            <li className="px-6 py-2 hover:bg-blue-300">
              <button
                className="ml-4 text-left w-full pl-2 py-2 font-semibold bg-blue-950 hover:bg-slate-950 rounded-md text-gray-200 mt-4"
                onClick={() => handleMenuClick('semestre')}
              >
                Semestre  
              </button>
            </li>
            {/* Add more items similarly */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-slate-900">
        <header className="flex justify-between items-center bg-[url('/img/navbar.jpg')] py-2 m-0">
          <h2 className="text-2xl p-5 font-semibold">ADMINISTRACION</h2>
          <div>   
            <a href=".\/dashboard">Perfil de usuario</a>
          </div>
        </header>

        <div className="mt-6">
          {/* Conditionally render components based on the active tab */}
          {activeComponent === 'usuarios' && <CrearUsuarios />}
         
          {/* Add other components conditionally as needed */}
          {activeComponent === 'carrera' && <CrearCarrera />}
          
          {/* Add other components conditionally as needed */}
          {activeComponent === 'materia' && <CrearMateria />}
          {/* Add other components conditionally as needed */}
          {activeComponent === 'profesion' && <CrearProfesion />}
          {/* Add other components conditionally as needed */}
          {activeComponent === 'semestre' && <CrearSemestre />}
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;