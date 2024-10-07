/*
  Warnings:

  - Added the required column `contrasena` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correo` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
INSERT INTO "new_Usuario" ("apellidos", "ci", "codigoUsuario", "fechaNacimiento", "id", "nombre", "rol") SELECT "apellidos", "ci", "codigoUsuario", "fechaNacimiento", "id", "nombre", "rol" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_codigoUsuario_key" ON "Usuario"("codigoUsuario");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
