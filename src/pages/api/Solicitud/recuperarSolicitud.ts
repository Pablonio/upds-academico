import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/lib'; // Adjust this import based on your project structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { idUsuario } = req.body;

    if (!idUsuario) {
        return res.status(400).json({ error: 'Se requiere el ID del usuario' });
    }

    try {
        const solicitudes = await db.solicitud.findMany({
            where: {
                idUsuario: parseInt(idUsuario)
            },
            include: {
                materia: true,
                usuario: true
            }
        });
        

        const solicitudesTransformadas = solicitudes.map(solicitud => ({
            id: solicitud.id,
            materia: solicitud.materia,
            estado: solicitud.estado || 'PENDIENTE',
            fecha: solicitud.fecha,
            comprobante: solicitud.comprobante
        }));

        res.status(200).json(solicitudesTransformadas);
    } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
        res.status(500).json({ error: 'Error al obtener las solicitudes' });
    }
}