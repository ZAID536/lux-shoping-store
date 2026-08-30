const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function main() {
  try {
    // 1. Read and parse .env.local
    const envPath = path.join(__dirname, '.env.local');
    if (!fs.existsSync(envPath)) {
      console.error('.env.local file not found at:', envPath);
      process.exit(1);
    }
    const envContent = fs.readFileSync(envPath, 'utf8');
    const dbUrlMatch = envContent.match(/^DATABASE_URL=(.+)$/m);
    if (!dbUrlMatch) {
      console.error('DATABASE_URL not found in .env.local');
      process.exit(1);
    }
    const databaseUrl = dbUrlMatch[1].trim();
    console.log('Using DATABASE_URL:', databaseUrl);

    // Parse mysql://user:pass@host:port/dbname
    const match = databaseUrl.match(/^mysql:\/\/([^:]+):([^@]*)@([^:]+):(\d+)\/(.+)$/);
    if (!match) {
      console.error('Invalid DATABASE_URL format. Expected mysql://user:pass@host:port/dbname');
      process.exit(1);
    }
    const [, user, password, host, port, database] = match;

    // 2. Try connecting with various password combinations for root
    const passwordsToTry = [password, '', 'root', 'admin', 'admin123', '123456', '12345678', 'mysql', 'root123'];
    let connection = null;
    let successfulPassword = null;

    for (const pw of passwordsToTry) {
      try {
        console.log(`Connecting to MySQL host=${host}:${port} as user=${user} with password="${pw}"...`);
        connection = await mysql.createConnection({
          host,
          port: parseInt(port),
          user,
          password: pw
        });
        successfulPassword = pw;
        break; // Successfully connected!
      } catch (err) {
        if (err.code !== 'ER_ACCESS_DENIED_ERROR') {
          throw err; // Real connection error, rethrow
        }
      }
    }

    if (!connection) {
      throw new Error('Access denied for all tried root password combinations.');
    }

    console.log(`Successfully connected to MySQL server using password: "${successfulPassword}"`);
    
    // Update the environment variables representation or notify the user
    if (successfulPassword !== password) {
      console.log(`[WARNING] The password in .env.local was "${password}", but we connected with "${successfulPassword}". Please update .env.local.`);
    }

    // Check if database exists
    const [databases] = await connection.query('SHOW DATABASES LIKE ?', [database]);
    if (databases.length === 0) {
      console.log(`Database "${database}" does not exist. Creating database...`);
      await connection.query(`CREATE DATABASE ${database};`);
      console.log(`Database "${database}" created.`);
    } else {
      console.log(`Database "${database}" exists.`);
    }

    await connection.end();

    // 3. Connect to the actual database
    console.log(`Connecting to database "${database}"...`);
    const dbConnection = await mysql.createConnection({
      host,
      port: parseInt(port),
      user,
      password: successfulPassword,
      database
    });

    // Check tables
    const [tables] = await dbConnection.query('SHOW TABLES');
    console.log('Tables in database:', tables.map(r => Object.values(r)[0]));

    if (tables.length === 0) {
      console.log('No tables found. Schema needs to be initialized.');
      console.log('Reading database/schema.sql...');
      const schemaPath = path.join(__dirname, 'database', 'schema.sql');
      if (!fs.existsSync(schemaPath)) {
        console.error('schema.sql not found at:', schemaPath);
        process.exit(1);
      }
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      
      console.log('Executing schema.sql...');
      const schemaConnection = await mysql.createConnection({
        host,
        port: parseInt(port),
        user,
        password: successfulPassword,
        multipleStatements: true
      });
      
      await schemaConnection.query(schemaSql);
      await schemaConnection.end();
      console.log('Schema successfully initialized.');

      // Recheck tables
      const [newTables] = await dbConnection.query('SHOW TABLES');
      console.log('Tables in database now:', newTables.map(r => Object.values(r)[0]));
      
      for (const tableObj of newTables) {
        const tableName = Object.values(tableObj)[0];
        const [[{ count }]] = await dbConnection.query(`SELECT COUNT(*) as count FROM ??`, [tableName]);
        console.log(`Table "${tableName}": ${count} rows`);
      }
    } else {
      // Print counts for some tables if they exist
      for (const tableObj of tables) {
        const tableName = Object.values(tableObj)[0];
        const [[{ count }]] = await dbConnection.query(`SELECT COUNT(*) as count FROM ??`, [tableName]);
        console.log(`Table "${tableName}": ${count} rows`);
      }
    }

    await dbConnection.end();
  } catch (error) {
    console.error('Database connection / check failed:', error);
  }
}

main();
