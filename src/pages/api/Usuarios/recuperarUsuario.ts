import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try{
            const usuarios = await db.usuario.findMany({
                include: {
                    profesion: true,
                    carrera: true,
                    semestre: true,
                    materia: true,
                },
            });
            res.status(200).json(usuarios);
        } catch (error) {
            console.error('Fallo al recuperar usuarios: ', error);
            res.status(500).json({ error: 'Fallo al recuperar usuarios', details: error instanceof Error ? error.message : 'Error desconocido' });
        }
    }else{
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}