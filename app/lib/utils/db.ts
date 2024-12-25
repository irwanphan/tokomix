import mysql from 'mysql2/promise';

let connection: mysql.Connection | null = null;

// Fungsi untuk membuat koneksi database
export async function getDatabaseConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '8889', 10),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'tokopro_nja',
    });
    console.log('Database connected.');
  }
  return connection;
}

// Fungsi untuk menjalankan query
export async function runQuery<T>(query: string, params: unknown[] = []): Promise<T[]> {
  const conn = await getDatabaseConnection();
  const [rows] = await conn.execute(query, params);
  return rows as T[];
}
