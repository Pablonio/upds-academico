import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'POST'){
        const {
            codigoMateria,
            nombre
        } = req.body;
        try{
            const materia = await db.materia.create({
                data: {
                    codigoMateria,
                    nombre
                },
            });
            res.status(201).json(materia);
        }catch(error){
            console.error('Fallo al crear materia: ', error);
            res.status(500).json({ error: 'Fallo al crear materia', details: error instanceof Error ? error.message : 'Error desconocido' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}