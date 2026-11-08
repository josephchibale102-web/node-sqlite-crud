const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.resolve(__dirname, 'campus_crud.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Create table and insert sample records automatically
        db.run(`CREATE TABLE IF NOT EXISTS clubs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(120) NOT NULL,
            description TEXT,
            category VARCHAR(60),
            president_name VARCHAR(120),
            member_count INT,
            meeting_day VARCHAR(30),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (!err) {
                // Check if records already exist
                db.get(`SELECT COUNT(*) as count FROM clubs`, (err, row) => {
                    if (row && row.count === 0) {
                        const insertQuery = `INSERT INTO clubs (name, description, category, president_name, member_count, meeting_day) VALUES ?`;
                        const sampleData = [
                            ['Computer Science Society', 'Coding, hackathons, and tech talks', 'Academic', 'Alice Mwansa', 45, 'Wednesday'],
                            ['Debate Club', 'Sharpening public speaking and critical thinking', 'Intellectual', 'John Banda', 30, 'Friday'],
                            ['Basketball Club', 'Campus hoops and inter-departmental tournaments', 'Sports', 'David Tembo', 20, 'Tuesday'],
                            ['Drama and Theatre Arts', 'Stage plays, acting workshops, and improv', 'Arts', 'Grace Phiri', 25, 'Thursday'],
                            ['Environmental Conservation Club', 'Tree planting and sustainability awareness', 'Social', 'Chola Mulenga', 50, 'Saturday'],
                            ['Chess Club', 'Strategy board games and tournaments', 'Recreation', 'Bwalya Kasonde', 15, 'Monday'],
                            ['Entrepreneurship Hub', 'Startup pitching and business mentorship', 'Professional', 'Mutinta Mweene', 40, 'Wednesday'],
                            ['Music and Choir', 'Vocal training, instruments, and campus concerts', 'Arts', 'Lungu Phiri', 35, 'Friday'],
                            ['Photography Club', 'Camera techniques, editing, and photo walks', 'Recreation', 'Kondwani Zulu', 22, 'Thursday'],
                            ['Red Cross Society', 'First aid training and community health outreach', 'Volunteering', 'Thandiwe Soko', 60, 'Saturday']
                        ];
                        
                        // Insert sample data one by one to avoid complex multi-row syntax issues in sqlite3 node module
                        const stmt = db.prepare(`INSERT INTO clubs (name, description, category, president_name, member_count, meeting_day) VALUES (?, ?, ?, ?, ?, ?)`);
                        sampleData.forEach(club => stmt.run(club));
                        stmt.finalize();
                        console.log('Sample records inserted successfully.');
                    }
                });
            }
        });
    }
});

module.exports = db;