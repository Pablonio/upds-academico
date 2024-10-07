import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {
            codigoUsuario,
            nombre,
            apellidos,
            ci,
            fechaNacimiento,
            rol,
        } = req.body;
        if (!codigoUsuario || !nombre || !apellidos || !ci || !fechaNacimiento) {
            return res.status(400).json({ error: 'Todos los campos son requeridos excepto rol' });
        }
        try {
            const usuario = await db.usuario.create({
                data: {
                    codigoUsuario,
                    nombre,
                    apellidos,
                    ci,
                    fechaNacimiento: new Date(fechaNacimiento),
                    rol: rol || 'Estudiante',
                },
            });
            res.status(201).json(usuario);
        } catch (error) {
            console.error('Fallo al crear usuario: ', error);
            res.status(500).json({ error: 'Fallo al crear usuario', details: error instanceof Error ? error.message : 'Error desconocido' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}