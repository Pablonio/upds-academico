import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/lib/lib";
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

const crearSolicitud = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { idMateria, idUsuario, comprobante } = req.body;

    if (!comprobante) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      // Parse the base64 string
      const base64Data = comprobante.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');

      // Generate a unique filename
      const fileName = `${Date.now()}_comprobante.png`;
      const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
      
      // Ensure the uploads directory exists
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

      // Write the file
      await fs.promises.writeFile(filePath, buffer);

      const fileUrl = `/uploads/${fileName}`;

      const nuevaSolicitud = await db.solicitud.create({
        data: {
          comprobante: fileUrl,
          estado: 'PENDIENTE',
          usuario: {
            connect: { id: parseInt(idUsuario) }
          },
          materia: {
            connect: { id: parseInt(idMateria) }
          },
          fecha: new Date(),
        },
      });

      return res.status(201).json(nuevaSolicitud);
    } catch (error) {
      console.error('Error creating request:', error);
      return res.status(500).json({ error: 'Error creating request' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

export default crearSolicitud;
