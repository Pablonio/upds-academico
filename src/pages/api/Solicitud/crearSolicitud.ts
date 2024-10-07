import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Método ${req.method} no permitido`);
    }

    try {
        const { idMateria, idUsuario } = req.body;

        if (!idMateria || !idUsuario) {
            return res.status(400).json({ error: 'Se requieren los campos idMateria e idUsuario' });
        }

        const nuevaSolicitud = await db.solicitud.create({
            data: {
                materia: { connect: { id: parseInt(idMateria as string) } },
                usuario: { connect: { id: parseInt(idUsuario as string) } },
                estado: 'PENDIENTE', // La solicitud siempre inicia como pendiente
                fecha: new Date()
            }
        });

        res.status(201).json(nuevaSolicitud);
    } catch (error) {
        console.error('Error al crear la solicitud:', error);
        res.status(500).json({ error: 'Error al crear la solicitud', details: error instanceof Error ? error.message : 'Error desconocido' });
    }
}
