import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const{
            codigoAula,
            numeroAula,
            piso,
            turnoManana,
            turnoTarde,
            turnoNoche
        }= req.body;
        try {
            const aula = await db.aula.create({
                data: {
                    codigoAula,
                    numeroAula,
                    piso,
                    turnoManana,
                    turnoTarde,
                    turnoNoche
                }
            });
            res.status(201).json(aula);
        } catch (error) {
            console.error('Fallo al crear aula:',error);
            res.status(500).json({error:'Fallo al crear aula', details:error instanceof Error? error.message: 'Error desconocido'});
        }
    } else{
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}