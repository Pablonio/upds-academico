import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const aulas = await db.aula.findMany();
            res.status(200).json(aulas);
        } catch (error) {
            console.error("Fallo al obtener aulas: ", error);
            res.status(500).json({error: "Fallo al obtener aulas", details: error instanceof Error ? error.message : "Error desconocido",});
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}