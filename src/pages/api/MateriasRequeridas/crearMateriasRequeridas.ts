import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {
            nombre,
            idMateria
        } = req.body;
        try {
            const materiasRequeridas = await db.materiasRequeridas.create({
                data: {
                    nombre,
                    idMateria
                },
            });
            res.status(201).json(materiasRequeridas);
        } catch (error) {
            console.error('Fallo al crear materias requeridas: ', error);
            res.status(500).json({ error: 'Fallo al crear materias requeridas', details: error instanceof Error ? error.message : 'Error desconocido' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}