-- CreateTable
CREATE TABLE "Eventos" (
    "EventoID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NomeEvento" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,
    "DataHora" DATETIME NOT NULL,
    "Localizacao" TEXT NOT NULL,
    "NomeOrganizador" TEXT NOT NULL,
    "ContatoOrganizador" TEXT,
    "InfoIngresso" TEXT,
    "ImagemCartaz" TEXT,
    "DataPublicacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "InscricoesEventos" (
    "InscricaoEventoID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "EventoID" INTEGER NOT NULL,
    "UsuarioID" INTEGER NOT NULL,
    "DataInscricao" DATETIME NOT NULL,
    CONSTRAINT "InscricoesEventos_EventoID_fkey" FOREIGN KEY ("EventoID") REFERENCES "Eventos" ("EventoID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InscricoesEventos_UsuarioID_fkey" FOREIGN KEY ("UsuarioID") REFERENCES "Usuarios" ("UsuarioID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "UsuarioID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NomeCompleto" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Senha" TEXT NOT NULL,
    "Telefone" TEXT NOT NULL,
    "DataNascimento" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_Email_key" ON "Usuarios"("Email");
