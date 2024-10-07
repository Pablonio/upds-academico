import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { nombre } = req.body;
            try {
                const carrera = await db.carrera.create({
                    data: {
                        nombre,
                    },
                });
            res.status(201).json(carrera);
            } catch (error) {
                console.error("Fallo al crear carrera: ", error);
                res.status(500).json({error: "Fallo al crear carrera",details: error instanceof Error ? error.message : "Error desconocido",});
            }
    } else {
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Método ${req.method} no permitido`);
    }
}
