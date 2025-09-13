API de Cursos com Node.js e Fastify
Projeto de estudo para construção de uma API RESTful com Node.js, Fastify e TypeScript. A API gerencia um cadastro simples de cursos, com funcionalidades para criar e listar registros.

✨ Tecnologias

Node.js (versão 18 ou superior)
TypeScript
Fastify
tsx (para execução em desenvolvimento)

⚡ Como Executar

Pré-requisitos:
Node.js (versão 18 ou superior)
npm ou yarn

Modo de Desenvolvimento
Para rodar o servidor com reinicialização automática ao salvar alterações:
npm install  # Instala as dependências
npm run dev  # Inicia o servidor

O servidor estará disponível em http://localhost:3000.

Endpoints da API:

GET /courses
Lista todos os cursos cadastrados.

GET /courses/:id
Retorna um curso específico pelo id.

POST /courses
Cria um novo curso. Envie um corpo JSON.

🤝 Contribuindo
Contribuições são bem-vindas! Abra issues ou pull requests para sugestões e melhorias.

🛠️ Solução de Problemas
Porta ocupada? Altere a porta no package.json ou use killall node.
Erro no TypeScript? Execute npm run build para verificar.
