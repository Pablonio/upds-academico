import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateCarrera = () => {
  const [nombre, setNombre] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/carreras', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre }),
    });
    router.push('/carreras');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Carrera</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Nombre</label>
        <input 
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
};

export default CreateCarrera;
