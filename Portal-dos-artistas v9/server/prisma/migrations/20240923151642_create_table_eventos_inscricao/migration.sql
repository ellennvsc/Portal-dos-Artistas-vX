-- CreateTable
CREATE TABLE "Eventos" (
    "EventoID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NomeEvento" TEXT NOT NULL,
    "DataHora" DATETIME NOT NULL,
    "Localizacao" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,
    "NomeOrganizador" TEXT NOT NULL,
    "ContatoOrganizador" TEXT,
    "InfoIngresso" TEXT,
    "ImagemCartaz" TEXT,
    "DataPublicacao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "InscricoesEventos" (
   "InscricaoEventoID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "EventoID" INTEGER NOT NULL,
    "UsuarioID" INTEGER NOT NULL,
    "DataInscricao" DATETIME NOT NULL,
    "CPF" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "MetodoPagamento" TEXT NOT NULL,
    "NumeroCartao" TEXT,
    "NomeCartao" TEXT,
    "ValidadeCartao" TEXT,
    "CVVCartao" TEXT,
    "ChavePix" TEXT,
    "BoletoGerado" BOOLEAN DEFAULT 0,
    CONSTRAINT "InscricoesEventos_EventoID_fkey" FOREIGN KEY ("EventoID") REFERENCES "Eventos" ("EventoID") ON DELETE RESTRICT ON UPDATE CASCADE
);
