import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Método ${req.method} no permitido`);
    }

    try {
        const { idUsuario } = req.query;

        if (!idUsuario) {
            return res.status(400).json({ error: 'Se requiere el ID del usuario' });
        }

        const solicitudes = await db.solicitud.findMany({
            where: {
                idUsuario: parseInt(idUsuario as string)
            },
            include: {
                materia: true
            }
        });

        // Transformar el estado para la respuesta
        const solicitudesTransformadas = solicitudes.map(solicitud => ({
            ...solicitud,
            estado: solicitud.estado === undefined ? 'PENDIENTE' : solicitud.estado ? 'APROBADA' : 'RECHAZADA'
        }));

        res.status(200).json(solicitudesTransformadas);
    } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
        res.status(500).json({ error: 'Error al obtener las solicitudes', details: error instanceof Error ? error.message : 'Error desconocido' });
    }
}