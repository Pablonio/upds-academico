import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function CreateMateria() {
    const [codigoMateria, setCodigoMateria] = useState("");
    const [nombre, setNombre] = useState("");
    const [horaIngresoMateria, setHoraIngresoMateria] = useState("");
    const [horaSalidaMateria, setHoraSalidaMateria] = useState("");
    const [fechaInicioMateria, setFechaInicioMateria] = useState("");
    const [fechaFinMateria, setFechaFinMateria] = useState("");
    const [semestres, setSemestres] = useState([]);
    const [idSemestre, setIdSemestre] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchSemestres = async () => {
            try {
                const response = await axios.get("/api/Semestre/recuperarSemestre");
                setSemestres(response.data);
            } catch (error) {
                console.error("Error al cargar semestres", error);
            }
        };
        fetchSemestres();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/api/Materias/crearMateria", {
                codigoMateria,
                nombre,
                horaIngresoMateria,
                horaSalidaMateria,
                fechaInicioMateria,
                fechaFinMateria,
                idSemestre,
            });
            router.push("/materia/list"); // Redirigir a una lista de materias
        } catch (error) {
            console.error("Error al crear materia", error);
        }
    };

    const generarCodigoMateria = (nombreMateria: string) => {
        const soloConsonantes = nombreMateria.replace(/[aeiou\s]/gi, "").toUpperCase();
        const fecha = new Date();
        const mesAnio = `${fecha.getFullYear()}${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
        return `${soloConsonantes}-${mesAnio}`;
    };

    const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNombre = e.target.value;
        setNombre(newNombre);
        setCodigoMateria(generarCodigoMateria(newNombre));
    };

    return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-white">Crear Materia</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-white">
                Código de la Materia:
                <input
                  type="text"
                  value={codigoMateria}
                  onChange={(e) => setCodigoMateria(e.target.value)}
                  className="mt-1 block w-full text-black pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
                  readOnly
                />
              </label>
            </div>
            <div>
              <label className="block text-lg font-medium text-white">
                Nombre de la Materia:
                <input
                  type="text"
                  value={nombre}
                  onChange={handleNombreChange}
                  className="mt-1 block w-full text-black pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-lg font-medium text-white">
                Seleccione Semestre y Carrera:
              </label>
              <table className="min-w-full bg-gray-700 text-white rounded-md shadow-md">
                <thead>
                  <tr>
                    <th className="py-2">Semestre</th>
                    <th className="py-2">Carrera</th>
                    <th className="py-2">Seleccionar</th>
                  </tr>
                </thead>
                <tbody>
                  {semestres.map((semestre: any) => (
                    <tr key={semestre.id} className="bg-gray-600 hover:bg-gray-500">
                      <td className="py-2 text-center">{semestre.nroSemestre}</td>
                      <td className="py-2 text-center">{semestre.carrera?.nombre || "Sin Carrera"}</td>
                      <td className="py-2 text-center">
                        <input
                          type="radio"
                          name="semestre"
                          value={semestre.id}
                          onChange={(e) => setIdSemestre(e.target.value)}
                          className="text-blue-500"
                          required
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <label className="block text-lg font-medium text-white">
                Hora de Ingreso:
                <select
                  value={horaIngresoMateria}
                  onChange={(e) => setHoraIngresoMateria(e.target.value)}
                  className="mt-1 block w-full text-black pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
                  required
                >
                  <option value="">Seleccionar Hora de Ingreso</option>
                  <option value="08:00">8:00AM</option>
                  <option value="15:00">15:00 PM</option>
                  <option value="19:00">19:00 PM</option>
                </select>
              </label>
            </div>
            <div>
              <label className="block text-lg font-medium text-white">
                Hora de Salida:
                <select
                  value={horaSalidaMateria}
                  onChange={(e) => setHoraSalidaMateria(e.target.value)}
                  className="mt-1 block w-full text-black pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
                  required
                >
                  <option value="">Seleccionar Hora de Salida</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="18:00">18:00 PM</option>
                  <option value="22:00">22:00 PM</option>
                </select>
              </label>
            </div>
            <div>
              <label className="block text-lg font-medium text-white">
                Fecha de Inicio:
                <input
                  type="date"
                  value={fechaInicioMateria}
                  onChange={(e) => setFechaInicioMateria(e.target.value)}
                  className="mt-1 block w-full text-black pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-lg font-medium text-white">
                Fecha de Fin:
                <input
                  type="date"
                  value={fechaFinMateria}
                  onChange={(e) => setFechaFinMateria(e.target.value)}
                  className="mt-1 block w-full text-black pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
                  required
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Crear Materia
            </button>
          </form>
        </div>
      )      
}
