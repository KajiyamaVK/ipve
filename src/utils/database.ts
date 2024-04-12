// // database.ts
import mysql, { PoolOptions, Pool } from 'mysql2/promise'

export async function createConnection(): Promise<Pool> {
  try {
    const access: PoolOptions = {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || ''),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      maxIdle: 10,
      idleTimeout: 60000,
      connectionLimit: 10,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      queueLimit: 0,
      connectTimeout: 60000,
    }
    return mysql.createPool(access)
  } catch (error) {
    console.error('Error connecting to database')
    throw new Error('Error connecting to database')
  }
}
