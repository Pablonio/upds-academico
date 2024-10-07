import React, { useState } from 'react';
import axios from 'axios';

const CrearCarrera: React.FC = () => {
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/Carrera/crearCarrera', { nombre });
      alert('Carrera creada exitosamente');
      setNombre('');
    } catch (error) {
      console.error('Error al crear carrera:', error);
      alert('Error al crear carrera. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Carrera</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre de la Carrera:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Crear Carrera
        </button>
      </form>
    </div>
  );
};

export default CrearCarrera;
