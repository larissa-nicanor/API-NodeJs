# API de Cursos com Node.js e Fastify

Este é um projeto de estudo para a criação de uma API RESTful utilizando Node.js, Fastify e TypeScript. A API gerencia um cadastro simples de cursos, permitindo criar e listar registros.

## ✨ Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

* **[Node.js](https://nodejs.org/en/)**
* **[TypeScript](https://www.typescriptlang.org/)**
* **[Fastify](https://www.fastify.io/)**
* **[tsx](https://github.com/esbuild-kit/tsx)** (para execução em modo de desenvolvimento)

* ## Iniciando o Projeto
### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Modo de Desenvolvimento
Para iniciar o servidor em modo de desenvolvimento (com reinicialização automática ao salvar alterações):
npm install  # Instala as dependências
npm run dev  # Inicia o servidor

## ⚡ Executando a Aplicação
Para iniciar o servidor em modo de desenvolvimento (com reinicialização automática ao salvar alterações), use o comando: npm run dev

O servidor estará disponível no endereço `http://localhost:3000`.

## Endpoints da API
A API possui os seguintes endpoints:

#### `GET /courses`
Retorna uma lista com todos os cursos cadastrados.

#### `GET /courses/:id`
Retorna um curso específico com base no seu `id`.

#### `POST /courses`
Cria um novo curso. É necessário enviar um corpo (`body`) no formato JSON.

🛠️ Troubleshooting
Erro de porta ocupada? Mude a porta no package.json ou mate o processo com killall node.
TypeScript não compila? Rode npm run build para verificar erros.
