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
    <div>
      <h1>Crear Semestre</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nroSemestre">Número de Semestre:</label>
          <input
            type="number"
            id="nroSemestre"
            value={nroSemestre || ""}
            onChange={(e) => setNroSemestre(parseInt(e.target.value))}
            required
            style={{ color: "black" }} // Estilo para texto negro
          />
        </div>
        <div>
          <label htmlFor="idCarrera">Seleccionar Carrera:</label>
          <select
            id="idCarrera"
            value={idCarrera}
            onChange={(e) => setIdCarrera(parseInt(e.target.value))}
            required
            style={{ color: "black" }} // Estilo para texto negro
          >
            <option value="">Seleccione una carrera</option>
            {carreras.map((carrera) => (
              <option key={carrera.id} value={carrera.id}>
                {carrera.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Crear Semestre</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}