// Importa o framework Fastify para criar o servidor HTTP
import fastify from 'fastify'
// Importa o plugin para documentação Swagger
import { fastifySwagger } from '@fastify/swagger'
// Importa utilitários do Zod para validação e serialização
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
// Importa as rotas da aplicação
import { createCourseRoute } from './src/routes/create-course.ts'
import { getCourseByIdRoute } from './src/routes/get-course-by-id.ts'
import { getCoursesRoute } from './src/routes/get-courses.ts'
// Importa o plugin para exibir a documentação interativa
import scalarAPIReference from '@scalar/fastify-api-reference'

// Cria a instância do servidor Fastify com logger customizado
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
}).withTypeProvider<ZodTypeProvider>() // Habilita suporte ao Zod para validação

// Registra plugins de documentação apenas em ambiente de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Desafio Node.js',
        version: '1.0.0',
      }
    },
    transform: jsonSchemaTransform,
  })
  
  server.register(scalarAPIReference, {
    routePrefix: '/docs', // Disponibiliza a documentação em /docs
  })
}

// Define os compiladores de validação e serialização do Zod
server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

// Registra as rotas da aplicação
server.register(createCourseRoute)
server.register(getCourseByIdRoute)
server.register(getCoursesRoute)

// Inicia o servidor na porta 3333
server.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})