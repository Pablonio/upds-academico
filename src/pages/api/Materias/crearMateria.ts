// /pages/api/materia/create.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { codigoMateria, nombre, fechaInicioMateria, fechaFinMateria, idSemestre } = req.body;


        const idInt = parseInt(idSemestre, 10)


        try {
            const materia = await db.materia.create({
                data: {
                    codigoMateria,
                    nombre,
                    fechaInicioMateria: new Date(fechaInicioMateria),
                    fechaFinMateria: new Date(fechaFinMateria),
                    semestre: {
                        connect: { id: idInt },
                    },
                },
            });
            res.status(201).json(materia);
        } catch (error) {
            console.error("Error al crear materia:", error);
            res.status(500).json({ error: "Fallo al crear materia", details: error instanceof Error ? error.message : "Error desconocido" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}
