-- CreateTable
CREATE TABLE "Carrera" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Semestre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nroSemestre" INTEGER NOT NULL,
    "idCarrera" INTEGER,
    CONSTRAINT "Semestre_idCarrera_fkey" FOREIGN KEY ("idCarrera") REFERENCES "Carrera" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Profesion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Usuario" (
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
    CONSTRAINT "Usuario_idCarrera_fkey" FOREIGN KEY ("idCarrera") REFERENCES "Carrera" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Usuario_idProfesion_fkey" FOREIGN KEY ("idProfesion") REFERENCES "Profesion" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MateriasRequeridas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "idMateria" INTEGER NOT NULL,
    CONSTRAINT "MateriasRequeridas_idMateria_fkey" FOREIGN KEY ("idMateria") REFERENCES "Materia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RegistroMateria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "idMateria" INTEGER NOT NULL,
    "idAula" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    CONSTRAINT "RegistroMateria_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RegistroMateria_idAula_fkey" FOREIGN KEY ("idAula") REFERENCES "Aula" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RegistroMateria_idMateria_fkey" FOREIGN KEY ("idMateria") REFERENCES "Materia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoMateria" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaInicioMateria" DATETIME NOT NULL,
    "fechaFinMateria" DATETIME NOT NULL,
    "idSemestre" INTEGER,
    CONSTRAINT "Materia_idSemestre_fkey" FOREIGN KEY ("idSemestre") REFERENCES "Semestre" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Aula" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigoAula" TEXT NOT NULL,
    "numeroAula" INTEGER NOT NULL,
    "piso" INTEGER NOT NULL,
    "idTurnoManana" INTEGER,
    "idTurnoTarde" INTEGER,
    "idTurnoNoche" INTEGER,
    "idMateria" INTEGER,
    CONSTRAINT "Aula_idMateria_fkey" FOREIGN KEY ("idMateria") REFERENCES "Materia" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Aula_idTurnoNoche_fkey" FOREIGN KEY ("idTurnoNoche") REFERENCES "TurnoNoche" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Aula_idTurnoTarde_fkey" FOREIGN KEY ("idTurnoTarde") REFERENCES "TurnoTarde" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Aula_idTurnoManana_fkey" FOREIGN KEY ("idTurnoManana") REFERENCES "TurnoManana" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

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

-- CreateTable
CREATE TABLE "Solicitud" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" INTEGER NOT NULL,
    "idMateria" INTEGER NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comprobante" TEXT,
    CONSTRAINT "Solicitud_idMateria_fkey" FOREIGN KEY ("idMateria") REFERENCES "Materia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Solicitud_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Carrera_nombre_key" ON "Carrera"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Profesion_nombre_key" ON "Profesion"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_codigoUsuario_key" ON "Usuario"("codigoUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_ci_key" ON "Usuario"("ci");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Materia_codigoMateria_key" ON "Materia"("codigoMateria");

-- CreateIndex
CREATE UNIQUE INDEX "Materia_nombre_key" ON "Materia"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Aula_codigoAula_key" ON "Aula"("codigoAula");
