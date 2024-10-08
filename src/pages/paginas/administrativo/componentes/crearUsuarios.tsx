import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Profesion {
  id: number;
  nombre: string;
}

interface Carrera {
  id: number;
  nombre: string;
}

const CrearUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellidos: '',
    ci: '',
    fechaNacimiento: '',
    rol: 'ESTUDIANTE'
  });
  const [carreraId, setCarreraId] = useState('');
  const [profesionId, setProfesionId] = useState('');
  const [profesiones, setProfesiones] = useState<Profesion[]>([]);
  const [carreras, setCarreras] = useState<Carrera[]>([]);

  useEffect(() => {
    fetchProfesiones();
    fetchCarreras();
  }, []);

  const fetchProfesiones = async () => {
    try {
      const response = await axios.get('/api/Profesion/recuperarProfesion');
      setProfesiones(response.data);
    } catch (error) {
      console.error('Error al obtener profesiones:', error);
    }
  };

  const fetchCarreras = async () => {
    try {
      const response = await axios.get('/api/Carrera/recuperarCarrera');
      setCarreras(response.data);
    } catch (error) {
      console.error('Error al obtener carreras:', error);
    }
  };

  const handleUsuarioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
  };

  const generarCodigoUsuario = (nombre: string, apellidos: string, ci: string) => {
    const inicialNombre = nombre.charAt(0).toUpperCase();
    const inicialApellido = apellidos.split(" ")[0].charAt(0).toUpperCase();
    return `${inicialNombre}${inicialApellido}-${ci}`;
  };

  const generarCorreoUsuario = (nombre: string, apellidos: string) => {
    const apellidosSinEspacios = apellidos.replace(/\s+/g, '.').toLowerCase();
    return `${nombre.toLowerCase()}.${apellidosSinEspacios}@upds.net.bo`;
  };

  const generarContrasena = (nombre: string, ci: string) => {
    return `${nombre.toLowerCase()}-${ci}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const codigoUsuario = generarCodigoUsuario(usuario.nombre, usuario.apellidos, usuario.ci);
      const correo = generarCorreoUsuario(usuario.nombre, usuario.apellidos);
      const contrasena = generarContrasena(usuario.nombre, usuario.ci);

      const usuarioData = {
        ...usuario,
        codigoUsuario,
        correo,
        contrasena,
        fechaNacimiento: new Date(usuario.fechaNacimiento).toISOString(),
        idCarrera: usuario.rol === 'ESTUDIANTE' ? parseInt(carreraId) : null,
        idProfesion: parseInt(profesionId) || null
      };

      await axios.post('/api/Usuarios/crearUsuario', usuarioData);
      alert('Usuario creado exitosamente');
      // Limpiar formulario
      setUsuario({
        nombre: '',
        apellidos: '',
        ci: '',
        fechaNacimiento: '',
        rol: 'ESTUDIANTE'
      });
      setCarreraId('');
      setProfesionId('');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('Error al crear usuario. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Crear Usuario</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-white">
            Nombre:
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={handleUsuarioChange}
              required
              className="mt-1 block w-full text-black pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12" // Aumentando la altura del input
            />
          </label>
        </div>
        <div>
          <label className="block text-lg font-medium text-white">
            Apellidos:
            <input
              type="text"
              name="apellidos"
              value={usuario.apellidos}
              onChange={handleUsuarioChange}
              required
              className="mt-1 block w-full text-black pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12" // Aumentando la altura del input
            />
          </label>
        </div>
        <div>
          <label className="block text-lg font-medium text-white">
            CI:
            <input
              type="text"
              name="ci"
              value={usuario.ci}
              onChange={handleUsuarioChange}
              required
              className="mt-1 block w-full text-black pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12" // Aumentando la altura del input
            />
          </label>
        </div>
        <div>
          <label className="block text-lg font-medium text-white">
            Fecha de Nacimiento:
            <input
              type="date"
              name="fechaNacimiento"
              value={usuario.fechaNacimiento}
              onChange={handleUsuarioChange}
              required
              className="mt-1 block w-full text-black pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12" // Aumentando la altura del input
            />
          </label>
        </div>
        <div>
          <label className="block text-lg font-medium text-white">
            Rol:
            <select
              name="rol"
              value={usuario.rol}
              onChange={handleUsuarioChange}
              className="mt-1 block w-full text-black pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12" // Aumentando la altura del select
            >
              <option value="ESTUDIANTE">ESTUDIANTE</option>
              <option value="DOCENTE">DOCENTE</option>
            </select>
          </label>
        </div>
        {usuario.rol === 'ESTUDIANTE' && (
          <div>
            <label className="block text-lg font-medium text-white">
              Carrera:
              <select
                value={carreraId}
                onChange={(e) => setCarreraId(e.target.value)}
                required
                className="mt-1 block w-full text-black pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12" // Aumentando la altura del select
              >
                <option value="">Selecciona una carrera</option>
                {carreras.map(carrera => (
                  <option key={carrera.id} value={carrera.id}>{carrera.nombre}</option>
                ))}
              </select>
            </label>
          </div>
        )}
        <div>
          <label className="block text-lg font-medium text-white">
            Profesión:
            <select
              value={profesionId}
              onChange={(e) => setProfesionId(e.target.value)}
              required
              className="mt-1 block w-full text-black pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12" // Aumentando la altura del select
            >
              <option value="">Selecciona una profesión</option>
              {profesiones.map(profesion => (
                <option key={profesion.id} value={profesion.id}>{profesion.nombre}</option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Crear Usuario
        </button>
      </form>
    </div>
  ); 
};

export default CrearUsuario;
