import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Materia {
    id: number;
    nombre: string;
}

interface Solicitud {
    id: number;
    materia: Materia;
    estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';
    fecha: string;
}

const SolicitarMateria: React.FC = () => {
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [selectedMateria, setSelectedMateria] = useState<string>('');
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [mensaje, setMensaje] = useState<string>('');

    useEffect(() => {
        fetchMaterias();
        fetchSolicitudes();
    }, []);

    const fetchMaterias = async () => {
        try {
            const res = await axios.get<Materia[]>('/api/Materias/recuperarMaterias');
            setMaterias(res.data);
        } catch (error) {
            console.error('Error al obtener materias:', error);
        }
    };

    const fetchSolicitudes = async () => {
        try {
            const res = await axios.get<Solicitud[]>('/api/Solicitud/recuperarSolicitud');
            setSolicitudes(res.data);
        } catch (error) {
            console.error('Error al obtener solicitudes:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const idUsuario = 1; // Aquí deberías obtener el idUsuario del contexto o autenticación
            await axios.post('/api/Solicitud/crearSolicitud', { idMateria: selectedMateria, idUsuario });
            setMensaje('Solicitud enviada con éxito');
            fetchSolicitudes();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMensaje(error.response.data.error || 'Error al enviar la solicitud');
            } else {
                setMensaje('Error al enviar la solicitud');
            }
        }
    };
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-white">Solicitar Materia</h1>
            
            <form onSubmit={handleSubmit} className="mb-8">
                <select
                    value={selectedMateria}
                    onChange={(e) => setSelectedMateria(e.target.value)}
                    className="w-full p-2 mb-4 bg-white text-gray-800 rounded"
                >
                    <option value="">Seleccione una materia</option>
                    {materias.map((materia) => (
                        <option key={materia.id} value={materia.id.toString()}>
                            {materia.nombre}
                        </option>
                    ))}
                </select>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Enviar Solicitud
                </button>
            </form>

            {mensaje && <p className="text-green-400 mb-4">{mensaje}</p>}

            <h2 className="text-xl font-semibold mb-4 text-white">Mis Solicitudes</h2>
                <div className="grid gap-4">
                    {solicitudes.map((solicitud) => (
                        <div key={solicitud.id} className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-white">{solicitud.materia.nombre}</h3>
                            <p className="text-gray-300">Estado: {solicitud.estado}</p>
                            <p className="text-gray-300">Fecha: {new Date(solicitud.fecha).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>

        </div>
    );
};

export default SolicitarMateria;