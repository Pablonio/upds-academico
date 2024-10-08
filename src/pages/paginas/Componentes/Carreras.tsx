// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Carrera {
//     id: number;
//     nombre: string;
//   }

// const Carrera: React.FC = () => {
//     const [carreras, setCarreras] = useState<Carrera[]>([]);

//   useEffect(() => {
//     // Fetch the list of "Carreras" from the API
//     const fetchCarreras = async () => {
//       try {
//         const response = await axios.get('/api/Carrera/obtenerCarreras');
//         setCarreras(response.data);
//       } catch (error) {
//         console.error('Error fetching carreras:', error);
//       }
//     };

//     fetchCarreras();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Lista de Carreras</h1>
//       <table className="min-w-full bg-black border border-gray-200">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border-b">ID</th>
//             <th className="px-4 py-2 border-b">Nombre</th>
//           </tr>
//         </thead>
//         <tbody>
//           {carreras.length > 0 ? (
//             carreras.map((carrera: any) => (
//               <tr key={carrera.id}>
//                 <td className="px-4 py-2 border-b">{carrera.id}</td>
//                 <td className="px-4 py-2 border-b">{carrera.nombre}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td className="px-4 py-2 text-center" colSpan={2}>No se encontraron carreras.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Carrera;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

// Define the Carrera interface
interface Carrera {
  id: number;
  nombre: string;
}

const Carrera: React.FC = () => {
  const [carreras, setCarreras] = useState<Carrera[]>([]);

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const response = await axios.get('/api/Carrera/obtenerCarrera');
        setCarreras(response.data);
      } catch (error) {
        console.error('Error fetching carreras:', error);
      }
    };

    fetchCarreras();
  }, []);

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2 }}
    className="relative bg-slate-900 min-h-96 p-20 w-fit flex items-center flex-wrap overflow-x-auto shadow-md sm:rounded-lg min-w- lg:min-w-screen-sm"
    >

      <h1 className="text-2xl p-10  text-center font-bold">Lista de Carreras</h1>
      <table className="w-full p-16 text-xl text-center rtl:text-right text-gray-500 dark:text-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Nombre</th>
          </tr>
        </thead>
        <tbody>
          {carreras.length > 0 ? (
            carreras.map((carrera: Carrera) => (
              <tr key={carrera.id}>                
                <td className="px-4 py-2 border-b">{carrera.nombre}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 text-center" colSpan={2}>No se encontraron carreras.</td>
            </tr>
          )}
        </tbody>
      </table>

    </motion.div>
  );
};

export default Carrera;
