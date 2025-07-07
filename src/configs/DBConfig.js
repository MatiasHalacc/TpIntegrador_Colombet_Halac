import 'dotenv/config'

const DBConfig = {
    host    : process.env.DB_HOST   ?? '',
    databse    : process.env.DB_DATABSE   ?? '',
    user    : process.env.DB_USER   ?? '',
    password    : process.env.DB_PASSWORD   ?? '',
    port    : process.env.DB_PORT   ?? 5432

}

export default DBConfig