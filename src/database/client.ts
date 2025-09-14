// Importa a função drizzle do Drizzle ORM para conectar ao PostgreSQL
import { drizzle } from 'drizzle-orm/node-postgres'

// Cria a conexão com o banco de dados PostgreSQL usando a variável de ambiente DATABASE_URL
// O logger: true ativa logs das queries no console para facilitar o debug
export const db = drizzle(process.env.DATABASE_URL, {
  logger: true,
})