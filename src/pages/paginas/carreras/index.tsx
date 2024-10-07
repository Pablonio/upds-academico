import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async () => {
  const carreras = await prisma.carrera.findMany();
  return { props: { carreras } };
};

const CarreraList = ({ carreras }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Carreras</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {carreras.map((carrera) => (
            <tr key={carrera.id}>
              <td className="border px-4 py-2">{carrera.id}</td>
              <td className="border px-4 py-2">{carrera.nombre}</td>
              <td className="border px-4 py-2">
                <a href={`/carreras/${carrera.id}`} className="text-blue-500 hover:underline">Edit</a> | 
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarreraList;