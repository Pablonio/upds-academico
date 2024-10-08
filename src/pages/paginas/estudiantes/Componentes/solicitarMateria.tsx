import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

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
    const [selectedMateria, setSelectedMateria] = useState<number | null>(null);
    const [selectedMateriaSecundaria, setSelectedMateriaSecundaria] = useState<number | null>(null);
    const [comprobante, setComprobante] = useState<File | null>(null);
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [mensaje, setMensaje] = useState<string>('');
    const userId = Cookies.get('userId') ? parseInt(Cookies.get('userId') as string) : null;

    useEffect(() => {
        if (userId) {
            fetchMaterias();
            fetchSolicitudes();
        }
    }, [userId]);

    const fetchMaterias = async () => {
        try {
            const res = await axios.get<Materia[]>('/api/Materias/recuperarMaterias');
            setMaterias(res.data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    const fetchSolicitudes = async () => {
        if (!userId) return;
        try {
            const res = await axios.post<Solicitud[]>('/api/Solicitud/recuperarSolicitud', { idUsuario: userId });
            setSolicitudes(res.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if (!userId || !comprobante || selectedMateria === null || selectedMateriaSecundaria === null) {
          setMensaje('Please select subjects and upload a file.');
          return;
        }
      
        try {
          // Convert file to base64
          const reader = new FileReader();
          reader.readAsDataURL(comprobante);
          reader.onload = async () => {
            const base64String = reader.result as string;
            
            const data = {
              comprobante: base64String,
              idMateria: selectedMateria,
              idMateriaSecundaria: selectedMateriaSecundaria,
              idUsuario: userId,
            };

            const response = await axios.post('/api/Solicitud/crearSolicitud', data);
        
            setMensaje('Request sent successfully');
            fetchSolicitudes();
          };
        } catch (error) {
          setMensaje('Error sending request');
          console.error('Detailed error:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-white">Request Subject</h1>
            
            <form onSubmit={handleSubmit} className="mb-8">
                <select
                    value={selectedMateria || ''}
                    onChange={(e) => setSelectedMateria(parseInt(e.target.value))}
                    className="w-full p-2 mb-4 bg-white text-gray-800 rounded"
                >
                    <option value="">Select a subject</option>
                    {materias.map((materia) => (
                        <option key={materia.id} value={materia.id}>
                            {materia.nombre}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedMateriaSecundaria || ''}
                    onChange={(e) => setSelectedMateriaSecundaria(parseInt(e.target.value))}
                    className="w-full p-2 mb-4 bg-white text-gray-800 rounded"
                >
                    <option value="">Select a secondary subject</option>
                    {materias.map((materia) => (
                        <option key={materia.id} value={materia.id}>
                            {materia.nombre}
                        </option>
                    ))}
                </select>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setComprobante(e.target.files ? e.target.files[0] : null)}
                    className="w-full p-2 mb-4 bg-white text-gray-800 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Send Request
                </button>
            </form>

            {mensaje && <p className="text-green-400 mb-4">{mensaje}</p>}

            <h2 className="text-xl font-semibold mb-4 text-white">My Requests</h2>
            <div className="grid gap-4">
                {solicitudes.map((solicitud) => (
                    <div key={solicitud.id} className="p-4 bg-gray-700 rounded">
                        <p className="text-white">Subject: {solicitud.materia.nombre}</p>
                        <p className="text-gray-400">Status: {solicitud.estado}</p>
                        <p className="text-gray-400">Date: {solicitud.fecha}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolicitarMateria;