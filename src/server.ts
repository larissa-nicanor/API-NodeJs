// Importa o framework Fastify para criar o servidor HTTP
import fastify from 'fastify'
// Importa o módulo crypto do Node.js para gerar IDs únicos
import crypto from 'node:crypto'

// Cria uma instância do servidor Fastify
// O logger customizado deixa os logs mais legíveis no terminal
const server = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z', // Mostra o horário dos logs
                ignore: 'pid,hostname',      // Oculta informações menos relevantes
            },
        },
    },
})

// Array que simula um banco de dados em memória para os cursos
// Cada curso tem um id e um título
const courses = [
    { id: '1', title: 'Curso de Node.js' },
    { id: '2', title: 'Curso de ReactJS' },
    { id: '3', title: 'Curso de React Native' },
]

// Rota GET para retornar todos os cursos cadastrados
// O endpoint /curses devolve o array completo de cursos
server.get('/curses', (request, replay) => {
    return replay.send({courses}) // Envia todos os cursos como resposta
})

// Rota GET para retornar um curso específico pelo ID
// O endpoint /curses/:id busca o curso pelo id informado na URL
server.get('/curses/:id', (request, replay) => {
    type Params = { 
        id: string // Define o tipo do parâmetro esperado
    }
    // Recupera o parâmetro id da URL
    const parmas = request.params as Params
    const courseId = parmas.id
    // Procura o curso no array pelo id
    const course = courses.find(course => course.id === courseId)
    if (course) {
        return { course } // Retorna o curso encontrado
    }
    // Se não encontrar, retorna erro 404 com mensagem
    return replay.status(404).send({ message: 'Não encontrado!' })
})

// Rota POST para criar um novo curso
// O endpoint /courses espera receber um título no corpo da requisição
server.post('/courses', (request, replay) =>{
    type Body = { 
        title: string // Define o tipo esperado no corpo da requisição
    }
    // Gera um id único para o novo curso
    const courseId = crypto.randomUUID()
    // Recupera o corpo da requisição e extrai o título
    const body = request.body as Body
    const courseTitle = body.title
    // Valida se o título foi enviado
    if (!courseTitle) {
        // Se não houver título, retorna erro 400
        return replay.status(400).send({ message: 'O título é obrigatório!' })
    }
    // Adiciona o novo curso ao array de cursos
    courses.push({ id: courseId, title: courseTitle })
    // Retorna o id do novo curso criado com status 201
    return replay.status(201).send(courseId)
})

// Inicia o servidor na porta 3000 e exibe mensagem no console
server.listen({ port: 3000}).then(() => {
    console.log('HTTP server running!')
})
