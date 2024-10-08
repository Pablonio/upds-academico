import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const semestres = await db.semestre.findMany({
                include: {
                    carrera: true, // Incluye la relación con carrera
                },
            });
            res.status(200).json(semestres);
        } catch (error) {
            console.error("Fallo al obtener semestres: ", error);
            res.status(500).json({
                error: "Fallo al obtener semestres",
                details: error instanceof Error ? error.message : "Error desconocido",
            });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}

