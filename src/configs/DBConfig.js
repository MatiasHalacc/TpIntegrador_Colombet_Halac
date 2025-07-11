import 'dotenv/config'

const DBConfig = {
    host: process.env.DB_HOST?.trim() || 'localhost',
    database: process.env.DB_DATABASE?.trim() || 'EVENTOS',
    user: process.env.DB_USER?.trim() || 'postgres',
    password: process.env.DB_PASSWORD?.trim() || 'root',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  }
  

export default DBConfig