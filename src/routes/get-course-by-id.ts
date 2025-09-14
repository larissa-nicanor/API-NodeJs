// Importa tipos e dependências necessárias para a rota
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import z from 'zod'
import { eq } from 'drizzle-orm'

// Rota para buscar um curso pelo ID
export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get('/courses/:id', {
    schema: {
      tags: ['courses'], // Tag para documentação
      summary: 'Get course by ID', // Resumo da rota
      params: z.object({
        id: z.uuid(), // Validação do parâmetro id
      }),
      response: {
        200: z.object({
          course: z.object({
            id: z.uuid(),
            title: z.string(),
            description: z.string().nullable(),
          })
        }),
        404: z.null().describe('Course not found'), // Resposta para não encontrado
      },
    },
  }, async (request, reply) => {
    const courseId = request.params.id // Obtém o id do parâmetro da URL
  
    // Busca o curso pelo id no banco de dados
    const result = await db
      .select()
      .from(courses)
      .where(eq(courses.id, courseId))
  
    if (result.length > 0) {
      // Retorna o curso encontrado
      return { course: result[0] }
    }
  
    // Retorna 404 se não encontrar
    return reply.status(404).send()
  })
}