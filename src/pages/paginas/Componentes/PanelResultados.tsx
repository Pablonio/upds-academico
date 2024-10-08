import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

// Definir interfaces para cada entidad
interface Carrera {
  id: number;
  nombre: string;
}

interface Profesion {
  id: number;
  nombre: string;
}

interface Semestre {
  id: number;
  numero: string;
}

interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

interface Materia {
  id: number;
  nombre: string;
}

const PanelResultados: React.FC = () => {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [profesiones, setProfesiones] = useState<Profesion[]>([]);
  const [semestres, setSemestres] = useState<Semestre[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [materias, setMaterias] = useState<Materia[]>([]);

  // Función para obtener todas las entidades
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carrerasResponse = await axios.get('/api/Carrera/obtenerCarrera');
        const profesionesResponse = await axios.get('/api/Profesion/recuperarProfesion');
        const semestresResponse = await axios.get('/api/Semestre/recuperarSemestre');
        const usuariosResponse = await axios.get('/api/Usuarios/recuperarUsuario');
        const materiasResponse = await axios.get('/api/Materias/recuperarMaterias');

        setCarreras(carrerasResponse.data);
        setProfesiones(profesionesResponse.data);
        setSemestres(semestresResponse.data);
        setUsuarios(usuariosResponse.data);
        setMaterias(materiasResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="bg-slate-900 min-h-96 p-10 flex flex-col space-y-10"
    >
      <h1 className="text-3xl text-center font-bold text-white">Panel de Control Registros Hechos</h1>

      {/* Sección para mostrar Carreras */}
      <div className="bg-gray-800 p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-white">Lista de Carreras</h2>
        <table className="w-full mt-4 text-xl text-center text-gray-300">
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
      </div>

      {/* Sección para mostrar Profesiones */}
      <div className="bg-gray-800 p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-white">Lista de Profesiones</h2>
        <table className="w-full mt-4 text-xl text-center text-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {profesiones.length > 0 ? (
              profesiones.map((profesion) => (
                <tr key={profesion.id}>
                  <td className="px-4 py-2 border-b">{profesion.nombre}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-center" colSpan={1}>
                  No se encontraron profesiones.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Sección para mostrar Semestres */}
      <div className="bg-gray-800 p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-white">Lista de Semestres</h2>
        <table className="w-full mt-4 text-xl text-center text-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Número</th>
            </tr>
          </thead>
          <tbody>
            {semestres.length > 0 ? (
              semestres.map((semestre) => (
                <tr key={semestre.id}>
                  <td className="px-4 py-2 border-b">{semestre.numero}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-center" colSpan={1}>
                  No se encontraron semestres.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Sección para mostrar Usuarios */}
      <div className="bg-gray-800 p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-white">Lista de Usuarios</h2>
        <table className="w-full mt-4 text-xl text-center text-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nombre</th>
              <th className="px-4 py-2 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="px-4 py-2 border-b">{usuario.nombre}</td>
                  <td className="px-4 py-2 border-b">{usuario.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-center" colSpan={2}>
                  No se encontraron usuarios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Sección para mostrar Materias */}
      <div className="bg-gray-800 p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-white">Lista de Materias</h2>
        <table className="w-full mt-4 text-xl text-center text-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {materias.length > 0 ? (
              materias.map((materia) => (
                <tr key={materia.id}>
                  <td className="px-4 py-2 border-b">{materia.nombre}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-center" colSpan={1}>
                  No se encontraron materias.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default PanelResultados;
