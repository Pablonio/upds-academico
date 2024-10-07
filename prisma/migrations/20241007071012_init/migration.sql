/*
  Warnings:

  - You are about to drop the column `idAula` on the `Materia` table. All the data in the column will be lost.
  - You are about to drop the column `idAula` on the `Usuario` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aula" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoAula" TEXT NOT NULL,
    "numeroAula" INTEGER NOT NULL,
    "piso" INTEGER NOT NULL,
    "turnoManana" BOOLEAN,
    "turnoTarde" BOOLEAN,
    "turnoNoche" BOOLEAN,
    "idMateria" INTEGER,
    "idUsuario" INTEGER,
    CONSTRAINT "Aula_idMateria_fkey" FOREIGN KEY ("idMateria") REFERENCES "Materia" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Aula_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Aula" ("codigoAula", "id", "numeroAula", "piso", "turnoManana", "turnoNoche", "turnoTarde") SELECT "codigoAula", "id", "numeroAula", "piso", "turnoManana", "turnoNoche", "turnoTarde" FROM "Aula";
DROP TABLE "Aula";
ALTER TABLE "new_Aula" RENAME TO "Aula";
CREATE UNIQUE INDEX "Aula_codigoAula_key" ON "Aula"("codigoAula");
CREATE TABLE "new_Materia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoMateria" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "horaIngresoMateria" TEXT NOT NULL,
    "horaSalidaMateria" TEXT NOT NULL,
    "fechaInicioMateria" DATETIME NOT NULL,
    "fechaFinMateria" DATETIME NOT NULL,
    "idUsuario" INTEGER,
    "idSemestre" INTEGER,
    CONSTRAINT "Materia_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Materia_idSemestre_fkey" FOREIGN KEY ("idSemestre") REFERENCES "Semestre" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Materia" ("codigoMateria", "fechaFinMateria", "fechaInicioMateria", "horaIngresoMateria", "horaSalidaMateria", "id", "idSemestre", "idUsuario", "nombre") SELECT "codigoMateria", "fechaFinMateria", "fechaInicioMateria", "horaIngresoMateria", "horaSalidaMateria", "id", "idSemestre", "idUsuario", "nombre" FROM "Materia";
DROP TABLE "Materia";
ALTER TABLE "new_Materia" RENAME TO "Materia";
CREATE UNIQUE INDEX "Materia_codigoMateria_key" ON "Materia"("codigoMateria");
CREATE UNIQUE INDEX "Materia_nombre_key" ON "Materia"("nombre");
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoUsuario" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'ESTUDIANTE'
);
INSERT INTO "new_Usuario" ("apellidos", "ci", "codigoUsuario", "contrasena", "correo", "fechaNacimiento", "id", "nombre", "rol") SELECT "apellidos", "ci", "codigoUsuario", "contrasena", "correo", "fechaNacimiento", "id", "nombre", "rol" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_codigoUsuario_key" ON "Usuario"("codigoUsuario");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
