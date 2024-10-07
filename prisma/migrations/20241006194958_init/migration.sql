-- CreateTable
CREATE TABLE "Carrera" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "idUsuario" INTEGER,
    CONSTRAINT "Carrera_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Semestre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nroSemestre" INTEGER NOT NULL,
    "idUsuario" INTEGER,
    "idCarrera" INTEGER,
    CONSTRAINT "Semestre_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Semestre_idCarrera_fkey" FOREIGN KEY ("idCarrera") REFERENCES "Carrera" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Profesion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "idUsuario" INTEGER,
    CONSTRAINT "Profesion_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoUsuario" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'ESTUDIANTE'
);

-- CreateTable
CREATE TABLE "MateriasRequeridas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "idMateria" INTEGER NOT NULL,
    CONSTRAINT "MateriasRequeridas_idMateria_fkey" FOREIGN KEY ("idMateria") REFERENCES "Materia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoMateria" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "idUsuario" INTEGER,
    "idSemestre" INTEGER,
    CONSTRAINT "Materia_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Materia_idSemestre_fkey" FOREIGN KEY ("idSemestre") REFERENCES "Semestre" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Carrera_nombre_key" ON "Carrera"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Profesion_nombre_key" ON "Profesion"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_codigoUsuario_key" ON "Usuario"("codigoUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Materia_codigoMateria_key" ON "Materia"("codigoMateria");

-- CreateIndex
CREATE UNIQUE INDEX "Materia_nombre_key" ON "Materia"("nombre");
