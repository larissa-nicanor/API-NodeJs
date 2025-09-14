// Importa tipos e dependências necessárias para a rota
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses } from '../database/schema.ts'
import z from 'zod'

// Rota para buscar todos os cursos
export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get('/courses', {
    schema: {
      tags: ['courses'], // Tag para documentação
      summary: 'Get all courses', // Resumo da rota
      response: {
        200: z.object({
          courses: z.array(
            z.object({
              id: z.uuid(),
              title: z.string()
            })
          )
        })
      }
    }
  }, async (request, reply) => {
    // Busca todos os cursos no banco de dados
    const result = await db.select({
      id: courses.id,
      title: courses.title,
    }).from(courses)
  
    // Retorna a lista de cursos
    return reply.send({ courses: result })
  })
}