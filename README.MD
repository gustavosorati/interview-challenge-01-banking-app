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

<div align="center">
  <img src="docs/o_projeto.gif" width="1080px" >
</div>

---
## ✨ Layout

Não foi disponibilizado um layout para o desafio, ficando livre para o candidato sua elaboração: layout desenvolvido no <a href="https://www.figma.com/file/2LRat671czaGbwcspf86XW/challenge-ng.cash?node-id=4%3A576&t=U86nT72Hw79yhg7Q-1">Figma</a>

<br/>

## ⚙️ Instalação

### 📋 Pré-requisitos

Para rodar esse aplicativo será necessário ter instalado:
- **postgressql** 
- **prisma cli**
- **nodejs**

### 🔧 Como utilizar

Fazer o download do projeto
```
https://github.com/gustavosorati/interview-challenge-01-banking-app.git
```

Instalar as dependências do backend e do frontend
```
npm i
```

Alterar os parâmetros de acesso ao banco de dados Postgres em: ``backend > .env`` seguindo o exemplo do arquivo ``.env.example``

Gerar as migrates para criar as tabelas do banco

```
npx prisma migrate dev
```

Inicializar o backend e o frontend
```
npm run dev
```

Com o projeto rodando, basta cadastrar usuários para poder utilizar as funcionalidades do sistema.

---

Feito com ❤️ por [Gustavo Sorati](https://github.com/gustavosorati) 