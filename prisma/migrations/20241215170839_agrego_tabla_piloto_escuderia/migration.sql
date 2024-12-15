-- CreateTable
CREATE TABLE "piloto" (
    "id_piloto" SERIAL NOT NULL,
    "nombre_piloto" TEXT NOT NULL,
    "nacionalidad_piloto" TEXT NOT NULL,
    "edad_piloto" INTEGER NOT NULL,
    "puntos_piloto" INTEGER NOT NULL DEFAULT 0,
    "posicion_piloto" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "piloto_pkey" PRIMARY KEY ("id_piloto")
);

-- CreateTable
CREATE TABLE "escuderia" (
    "id_escuderia" SERIAL NOT NULL,
    "nombre_escuderia" TEXT NOT NULL,
    "pais_escuderia" TEXT NOT NULL,
    "anio_creacion_escuderia" INTEGER NOT NULL,
    "puntos_escuderia" INTEGER NOT NULL DEFAULT 0,
    "posicion_escuderia" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "escuderia_pkey" PRIMARY KEY ("id_escuderia")
);
