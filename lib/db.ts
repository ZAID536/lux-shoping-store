import mysql from 'mysql2/promise';

// Singleton connection pool for Next.js dev (prevents connection overflow on hot reload)
declare global {
  // eslint-disable-next-line no-var
  var __mysqlPool: mysql.Pool | undefined;
}

function createPool(): mysql.Pool {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set in .env.local');
  }

  // Parse mysql://user:pass@host:port/dbname
  const match = url.match(
    /^mysql:\/\/([^:]+):([^@]*)@([^:]+):(\d+)\/(.+)$/
  );
  if (!match) {
    throw new Error('Invalid DATABASE_URL format. Expected: mysql://user:pass@host:port/dbname');
  }

  const [, user, password, host, port, database] = match;

  return mysql.createPool({
    host,
    port: parseInt(port),
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
}

export function getPool(): mysql.Pool {
  if (!global.__mysqlPool) {
    global.__mysqlPool = createPool();
  }
  return global.__mysqlPool;
}

export async function query<T = unknown>(
  sql: string,
  values?: any[]
): Promise<T[]> {
  const pool = getPool();
  const [rows] = await pool.execute(sql, values);
  return rows as T[];
}

export async function queryOne<T = unknown>(
  sql: string,
  values?: any[]
): Promise<T | null> {
  const rows = await query<T>(sql, values);
  return rows[0] ?? null;
}

export async function execute(
  sql: string,
  values?: any[]
): Promise<mysql.ResultSetHeader> {
  const pool = getPool();
  const [result] = await pool.execute(sql, values);
  return result as mysql.ResultSetHeader;
}

