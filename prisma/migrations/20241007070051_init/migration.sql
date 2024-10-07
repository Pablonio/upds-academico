/*
  Warnings:

  - You are about to drop the column `horaInMateria` on the `Materia` table. All the data in the column will be lost.
  - Added the required column `fechaFinMateria` to the `Materia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaInicioMateria` to the `Materia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horaIngresoMateria` to the `Materia` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "idAula" INTEGER,
    CONSTRAINT "Materia_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Materia_idSemestre_fkey" FOREIGN KEY ("idSemestre") REFERENCES "Semestre" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Materia_idAula_fkey" FOREIGN KEY ("idAula") REFERENCES "Aula" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Materia" ("codigoMateria", "horaSalidaMateria", "id", "idAula", "idSemestre", "idUsuario", "nombre") SELECT "codigoMateria", "horaSalidaMateria", "id", "idAula", "idSemestre", "idUsuario", "nombre" FROM "Materia";
DROP TABLE "Materia";
ALTER TABLE "new_Materia" RENAME TO "Materia";
CREATE UNIQUE INDEX "Materia_codigoMateria_key" ON "Materia"("codigoMateria");
CREATE UNIQUE INDEX "Materia_nombre_key" ON "Materia"("nombre");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
