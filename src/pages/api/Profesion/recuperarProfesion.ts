import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const profesiones = await db.profesion.findMany({
                include: {
                    usuario: true,
                },
            });
            res.status(200).json(profesiones);
        } catch (error) {
            console.error('Fallo al recuperar profesiones: ', error);
            res.status(500).json({ error: 'Fallo al recuperar profesiones', details: error instanceof Error ? error.message : 'Error desconocido' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}