import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const UpdateCarrera = () => {
  const router = useRouter();
  const { id } = router.query;
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/api/carreras/${id}`)
        .then((res) => res.json())
        .then((data) => setNombre(data.nombre));
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/api/carreras/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre }),
    });
    router.push('/carreras');
  };

  const handleDelete = async () => {
    await fetch(`/api/carreras/${id}`, { method: 'DELETE' });
    router.push('/carreras');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Carrera</h1>
      <form onSubmit={handleUpdate}>
        <label className="block mb-2">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
      </form>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mt-4">Delete</button>
    </div>
  );
};

export default UpdateCarrera;
