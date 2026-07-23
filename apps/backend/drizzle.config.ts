import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/database/schema.ts',
  dialect: 'sqlite',
  out: './drizzle',
  dbCredentials: {
    url: './data/application.sqlite',
  },
})