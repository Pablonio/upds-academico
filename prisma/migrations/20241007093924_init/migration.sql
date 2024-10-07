/*
  Warnings:

  - You are about to drop the column `idUsuario` on the `Profesion` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Solicitud" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" INTEGER,
    "idMateria" INTEGER,
    "estado" BOOLEAN NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Solicitud_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Solicitud_idMateria_fkey" FOREIGN KEY ("idMateria") REFERENCES "Materia" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profesion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);
INSERT INTO "new_Profesion" ("id", "nombre") SELECT "id", "nombre" FROM "Profesion";
DROP TABLE "Profesion";
ALTER TABLE "new_Profesion" RENAME TO "Profesion";
CREATE UNIQUE INDEX "Profesion_nombre_key" ON "Profesion"("nombre");
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoUsuario" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'ESTUDIANTE',
    "idProfesion" INTEGER,
    "idCarrera" INTEGER,
    CONSTRAINT "Usuario_idProfesion_fkey" FOREIGN KEY ("idProfesion") REFERENCES "Profesion" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Usuario_idCarrera_fkey" FOREIGN KEY ("idCarrera") REFERENCES "Carrera" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("apellidos", "ci", "codigoUsuario", "contrasena", "correo", "fechaNacimiento", "id", "idCarrera", "nombre", "rol") SELECT "apellidos", "ci", "codigoUsuario", "contrasena", "correo", "fechaNacimiento", "id", "idCarrera", "nombre", "rol" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_codigoUsuario_key" ON "Usuario"("codigoUsuario");
CREATE UNIQUE INDEX "Usuario_ci_key" ON "Usuario"("ci");
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
