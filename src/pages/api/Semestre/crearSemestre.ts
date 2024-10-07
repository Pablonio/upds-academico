import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { nroSemestre } = req.body;
    try {
      const semestre = await db.semestre.create({
        data: {
          nroSemestre,
        },
      });
      res.status(201).json(semestre);
    } catch (error) {
      console.error("Fallo al crear semestre: ", error);
      res
        .status(500)
        .json({
          error: "Fallo al crear semestre",
          details: error instanceof Error ? error.message : "Error desconocido",
        });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
