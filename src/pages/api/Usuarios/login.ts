import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/lib";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        try {
            const usuario = await db.usuario.findUnique({
                where: { correo: email } // Asegúrate de que este campo esté definido en tu modelo Prisma
            });

            if (!usuario) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            const passwordMatch = await bcrypt.compare(password, usuario.contrasena); // Cambié 'Contrasena' a 'contrasena'
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            // Si el inicio de sesión es exitoso, puedes devolver el rol
            res.status(200).json({ rol: usuario.rol }); // Cambié 'Rol' a 'rol'
        } catch (error) {
            console.error('Fallo en el inicio de sesión: ', error);
            res.status(500).json({ error: 'Fallo en el inicio de sesión', details: error instanceof Error ? error.message : 'Error desconocido' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}
