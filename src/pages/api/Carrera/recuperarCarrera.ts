import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const carreras = await db.carrera.findMany({
                include: {
                    usuario: true,
                    semestre: true,
                },
            });
            res.status(200).json(carreras);
        } catch (error) {
            console.error("Fallo al recuperar carreras: ", error);
            res.status(500).json({error: "Fallo al recuperar carreras", details: error instanceof Error ? error.message : "Error desconocido",});
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}
