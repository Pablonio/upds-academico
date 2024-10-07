/*
  Warnings:

  - You are about to drop the column `turnoManana` on the `Aula` table. All the data in the column will be lost.
  - You are about to drop the column `turnoNoche` on the `Aula` table. All the data in the column will be lost.
  - You are about to drop the column `turnoTarde` on the `Aula` table. All the data in the column will be lost.
  - You are about to drop the column `horaIngresoMateria` on the `Materia` table. All the data in the column will be lost.
  - You are about to drop the column `horaSalidaMateria` on the `Materia` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "TurnoManana" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "horaIngreso" TEXT NOT NULL DEFAULT '08:00 - 11:00'
);

-- CreateTable
CREATE TABLE "TurnoTarde" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "horaIngreso" TEXT NOT NULL DEFAULT '15:00 - 18:00'
);

-- CreateTable
CREATE TABLE "TurnoNoche" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "horaIngreso" TEXT NOT NULL DEFAULT '19:00 - 22:00'
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aula" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoAula" TEXT NOT NULL,
    "numeroAula" INTEGER NOT NULL,
    "piso" INTEGER NOT NULL,
    "idTurnoManana" INTEGER,
    "idTurnoTarde" INTEGER,
    "idTurnoNoche" INTEGER,
    "idMateria" INTEGER,
    CONSTRAINT "Aula_idTurnoManana_fkey" FOREIGN KEY ("idTurnoManana") REFERENCES "TurnoManana" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Aula_idTurnoTarde_fkey" FOREIGN KEY ("idTurnoTarde") REFERENCES "TurnoTarde" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Aula_idTurnoNoche_fkey" FOREIGN KEY ("idTurnoNoche") REFERENCES "TurnoNoche" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Aula_idMateria_fkey" FOREIGN KEY ("idMateria") REFERENCES "Materia" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Aula" ("codigoAula", "id", "idMateria", "numeroAula", "piso") SELECT "codigoAula", "id", "idMateria", "numeroAula", "piso" FROM "Aula";
DROP TABLE "Aula";
ALTER TABLE "new_Aula" RENAME TO "Aula";
CREATE UNIQUE INDEX "Aula_codigoAula_key" ON "Aula"("codigoAula");
CREATE TABLE "new_Materia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoMateria" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaInicioMateria" DATETIME NOT NULL,
    "fechaFinMateria" DATETIME NOT NULL,
    "idSemestre" INTEGER,
    CONSTRAINT "Materia_idSemestre_fkey" FOREIGN KEY ("idSemestre") REFERENCES "Semestre" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Materia" ("codigoMateria", "fechaFinMateria", "fechaInicioMateria", "id", "idSemestre", "nombre") SELECT "codigoMateria", "fechaFinMateria", "fechaInicioMateria", "id", "idSemestre", "nombre" FROM "Materia";
DROP TABLE "Materia";
ALTER TABLE "new_Materia" RENAME TO "Materia";
CREATE UNIQUE INDEX "Materia_codigoMateria_key" ON "Materia"("codigoMateria");
CREATE UNIQUE INDEX "Materia_nombre_key" ON "Materia"("nombre");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
