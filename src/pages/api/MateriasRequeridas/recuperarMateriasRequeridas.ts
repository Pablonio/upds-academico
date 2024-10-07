import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const materiasRequeridas = await db.materiasRequeridas.findMany({
                include: {
                    materia: true,
                },
            });
            res.status(200).json(materiasRequeridas);
        } catch (error) {
            console.error('Fallo al recuperar materias requeridas: ', error);
            res.status(500).json({ error: 'Fallo al recuperar materias requeridas', details: error instanceof Error ? error.message : 'Error desconocido' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}