# Desafio - Sistema de transações entre usuários

O projeto foi um desafio proposto durante uma entrevista de emprego, o sistema simula um sistema de transações bancarias, permitindo que usuários cadastrados realizem transferências entre si, desde que estejam logados no sistema.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## Demonstração

Layout da aplicação: <a href="https://www.figma.com/file/2LRat671czaGbwcspf86XW/challenge-ng.cash?node-id=4%3A576&t=U86nT72Hw79yhg7Q-1">Figma</a>


<img src="docs/login.jpg" >
<img src="docs/table.jpg" >
<img src="docs/transaction.jpg" >

## Instalação

**Backend**

- Fazer o download do projeto
- Dentro da pasta backend, instalar as dependências `npm i` e com o docker instalado e rodando, executar o comando: `docker compose up -d`, assim o banco de dados será criado.
- Logo em seguida executar o comando `npx prisma migrade dev` para que as tabelas sejam geradas
- Criar variaveis ambientes `.env`:

```json
DATABASE_URL="postgresql://postgres:postgresql@localhost:5432/backend"
TOKEN_HASH_VALIDATION="beac5f8171fcde5e2ec734cc5d25d03e7362e8de"
```

- Inicializar o servidor com o comando `npm run dev`.
- O servidor já estará rodando.

**Frontend**
- Fazer o download do projeto
- Dentro da pasta backend, instalar as dependências `npm i`
- Executar o projeto `npm run dev`

O projeto então estará rodando, após isso o primeiro passo a se fazer é cadastrar um usuário para poder realizar as transações.

