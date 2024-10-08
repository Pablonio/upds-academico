import { useState, useEffect } from "react";
import axios from "axios";

interface Carrera {
  id: number;
  nombre: string;
}
export default function CrearSemestre() {
  const [nroSemestre, setNroSemestre] = useState<number | undefined>(undefined);
  const [idCarrera, setIdCarrera] = useState<number | undefined>(undefined);
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const res = await axios.get("/api/Carrera/recuperarCarrera");
        setCarreras(res.data);
      } catch (error) {
        console.error("Error al obtener carreras:", error);
        setMensaje("Error al cargar las carreras.");
      }
    };

    fetchCarreras();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/Semestre/crearSemestre", {
        nroSemestre,
        idCarrera,
      });
      setMensaje(`Semestre creado con éxito: ${JSON.stringify(res.data)}`);
    } catch (error: any) {
      if (error.response) {
        setMensaje(`Error: ${error.response.data.error}`);
      } else {
        setMensaje(`Error inesperado: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Semestre</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Número de Semestre:
            <input
              type="number"
              id="nroSemestre"
              value={nroSemestre || ""}
              onChange={(e) => setNroSemestre(parseInt(e.target.value))}
              required
              className="mt-1 block w-full text-black pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12"
              style={{ color: "black" }} // Text styled in black
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Seleccionar Carrera:
            <select
              id="idCarrera"
              value={idCarrera}
              onChange={(e) => setIdCarrera(parseInt(e.target.value))}
              required
              className="mt-1 block w-full text-black pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-12"
              style={{ color: "black" }} // Text styled in black
            >
              <option value="">Seleccione una carrera</option>
              {carreras.map((carrera) => (
                <option key={carrera.id} value={carrera.id}>
                  {carrera.nombre}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Crear Semestre
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}