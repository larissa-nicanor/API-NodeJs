// Importa funções e tipos do Drizzle ORM para definir tabelas e colunas do banco
import { pgTable, uuid, text } from 'drizzle-orm/pg-core'

// Define a tabela "users" com colunas id, name e email
export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(), // Chave primária UUID gerada automaticamente
  name: text().notNull(),                  // Nome do usuário (obrigatório)
  email: text().notNull().unique(),        // E-mail do usuário (obrigatório e único)
})

// Define a tabela "courses" com colunas id, title e description
export const courses = pgTable('courses', {
  id: uuid().primaryKey().defaultRandom(),     // Chave primária UUID gerada automaticamente
  title: text().notNull().unique(),            // Título do curso (obrigatório e único)
  description: text(),                         // Descrição do curso (opcional)
})