// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CarrerasTable: React.FC = () => {
//   const [carreras, setCarreras] = useState([]);

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
//       <table className="min-w-full bg-white border border-gray-200">
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

// export default CarrerasTable;