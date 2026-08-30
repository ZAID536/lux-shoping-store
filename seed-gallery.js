const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const gallery = [
  {
    title: 'Florentine Leather Workshop',
    description: 'Where our bags are hand-cut and finished using vegetable-tanned hides.',
    image_url: 'https://images.unsplash.com/photo-1590534244455-87a419266ad8?w=800&q=80'
  },
  {
    title: 'Bespoke Jewelry Crafting',
    description: 'Refining 925 sterling silver into timeless heirloom jewelry.',
    image_url: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80'
  },
  {
    title: 'Signature Watches Assembly',
    description: 'Detailed calibration of our Swiss-movement watches.',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'
  },
  {
    title: 'Showroom Florence',
    description: "A quiet corner in our flagship atelier on Via de' Tornabuoni.",
    image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'
  }
];

async function main() {
  try {
    const envPath = path.join(__dirname, '.env.local');
    if (!fs.existsSync(envPath)) {
      console.error('.env.local file not found');
      process.exit(1);
    }
    const envContent = fs.readFileSync(envPath, 'utf8');
    const dbUrlMatch = envContent.match(/^DATABASE_URL=(.+)$/m);
    if (!dbUrlMatch) {
      console.error('DATABASE_URL not found in .env.local');
      process.exit(1);
    }
    const databaseUrl = dbUrlMatch[1].trim();
    
    // Parse mysql://user:pass@host:port/dbname
    const match = databaseUrl.match(/^mysql:\/\/([^:]+):([^@]*)@([^:]+):(\d+)\/(.+)$/);
    if (!match) {
      console.error('Invalid DATABASE_URL format.');
      process.exit(1);
    }
    const [, user, password, host, port, database] = match;

    console.log('Connecting to database to seed gallery...');
    const connection = await mysql.createConnection({
      host,
      port: parseInt(port),
      user,
      password,
      database
    });

    // Check if gallery items exist
    const [[{ count }]] = await connection.query('SELECT COUNT(*) as count FROM gallery');
    if (count > 0) {
      console.log(`Database already has ${count} gallery items. Skipping gallery seeding.`);
      await connection.end();
      return;
    }

    console.log('Seeding gallery items...');
    for (const item of gallery) {
      await connection.query(
        'INSERT INTO gallery (title, description, image_url) VALUES (?, ?, ?)',
        [item.title, item.description, item.image_url]
      );
      console.log(`Seeded: ${item.title}`);
    }

    console.log('Gallery seeding completed successfully!');
    await connection.end();
  } catch (error) {
    console.error('Failed to seed gallery items:', error);
  }
}

main();
