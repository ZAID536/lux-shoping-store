const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const team = [
  {
    name: 'Alessandra Rossi',
    role: 'Creative Director',
    bio: 'With over 15 years of experience in Tuscan leather crafts, Alessandra oversees our seasonal collections and artisan partnerships.',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    sort_order: 1
  },
  {
    name: 'Matteo Ricci',
    role: 'Master Artisan',
    bio: 'A third-generation leather craftsman, Matteo ensures every stitch and edge finish meets our heritage standards.',
    image_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    sort_order: 2
  },
  {
    name: 'Sofia Moretti',
    role: 'Head of Sustainability',
    bio: 'Sofia leads our initiatives in sourcing eco-certified full-grain leathers and recycled metals.',
    image_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    sort_order: 3
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

    console.log('Connecting to database to seed team members...');
    const connection = await mysql.createConnection({
      host,
      port: parseInt(port),
      user,
      password,
      database
    });

    // Check if team members exist
    const [[{ count }]] = await connection.query('SELECT COUNT(*) as count FROM team_members');
    if (count > 0) {
      console.log(`Database already has ${count} team members. Skipping team seeding.`);
      await connection.end();
      return;
    }

    console.log('Seeding team members...');
    for (const m of team) {
      await connection.query(
        'INSERT INTO team_members (name, role, bio, image_url, sort_order) VALUES (?, ?, ?, ?, ?)',
        [m.name, m.role, m.bio, m.image_url, m.sort_order]
      );
      console.log(`Seeded: ${m.name} (${m.role})`);
    }

    console.log('Team seeding completed successfully!');
    await connection.end();
  } catch (error) {
    console.error('Failed to seed team members:', error);
  }
}

main();
