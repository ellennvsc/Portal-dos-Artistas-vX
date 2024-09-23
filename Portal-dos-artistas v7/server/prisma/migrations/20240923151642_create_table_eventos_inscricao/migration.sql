-- CreateTable
CREATE TABLE "Eventos" (
    "EventoID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NomeEvento" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,
    "DataHora" DATETIME NOT NULL,
    "Localizacao" TEXT NOT NULL,
    "Organizador" TEXT NOT NULL,
    "InfoIngresso" TEXT,
    "ImagemCartaz" TEXT,
    "DataPublicacao" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "InscricoesEventos" (
    "InscricaoEventoID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "EventoID" INTEGER NOT NULL,
    "UsuarioID" INTEGER NOT NULL,
    "DataInscricao" DATETIME NOT NULL,
    CONSTRAINT "InscricoesEventos_EventoID_fkey" FOREIGN KEY ("EventoID") REFERENCES "Eventos" ("EventoID") ON DELETE RESTRICT ON UPDATE CASCADE
);
