# Portal-dos-Artistas-vX
Este repositório contém o código e a documentação do Módulo EVENTOS do projeto Portal do Artista, uma plataforma que visa centralizar a divulgação de eventos culturais e facilitar a inscrição e emissão de ingressos para o público e artistas.

## Objetivo
O Módulo EVENTOS permite que usuários cadastrados (artistas, gestores culturais e público em geral) tenham acesso a uma lista de eventos culturais, incluindo exposições, apresentações e workshops. O módulo também facilita a inscrição em eventos e a emissão de ingressos digitais, proporcionando uma plataforma centralizada para promover a visibilidade de artistas e aumentar a participação da sociedade em eventos culturais.

## Como utilizar

### instale as dependências

```shell
cd server
npm install
npx prisma migrate dev --name init
```

### crie o .env baseado do no .env.example

### Inicie o servidor

```shell
npm run dev
```

### Abra o Front-End com Live-Server

Feito isso voce irá conseguir utilizar o projeto corretamente