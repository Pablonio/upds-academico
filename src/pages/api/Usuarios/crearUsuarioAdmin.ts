import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";
import bcrypt from "bcrypt";

interface UsuarioRequestBody {
    codigoUsuario: string;
    nombre: string;
    apellidos: string;
    ci: string;
    correo: string;
    contrasena: string;
    fechaNacimiento: string; // O Date, dependiendo de cómo manejas la fecha
    rol: string;
    idCarrera?: number; // Asumiendo que idCarrera es opcional y de tipo number
    profesiones: Array<{ id: number }>; // Especifica que profesiones es un array de objetos con un id
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {
            codigoUsuario,
            nombre,
            apellidos,
            ci,
            correo,
            contrasena,
            fechaNacimiento,
            rol,
            idCarrera,
            profesiones
        }: UsuarioRequestBody = req.body;

        try {
            // Hashear la contraseña
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

            const usuario = await db.usuario.create({
                data: {
                    codigoUsuario,
                    nombre,
                    apellidos,
                    ci,
                    correo,
                    contrasena: hashedPassword, // Almacena la contraseña hasheada
                    fechaNacimiento: new Date(fechaNacimiento),
                    rol,
                    ...(idCarrera && { carrera: { connect: { id: idCarrera } } }),
                    ...(profesiones.length > 0 && { profesiones: { connect: profesiones.map(({ id }) => ({ id })) } })
                }
            });

            res.status(201).json(usuario);
        } catch (error) {
            console.error("Error al crear usuario:", error);
            res.status(500).json({ error: "Error al crear usuario" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
