// Importa tipos e dependências necessárias para a rota
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import z from 'zod'

// Rota para criar um novo curso
export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post('/courses', {
    schema: {
      tags: ['courses'], // Tag para documentação
      summary: 'Create a course', // Resumo da rota
      body: z.object({
        title: z.string().min(5, 'Título precisa ter 5 caracteres'), // Validação do título
      }),
      response: {
        201: z.object({ courseId: z.uuid() }).describe('Curso criado com sucesso!') // Resposta esperada
      }
    },
  }, async (request, reply) => {
    const courseTitle = request.body.title // Obtém o título do corpo da requisição
  
    // Insere o novo curso no banco de dados
    const result = await db
      .insert(courses)
      .values({ title: courseTitle })
      .returning()
  
    // Retorna o ID do curso criado
    return reply.status(201).send({ courseId: result[0].id })
  })
}