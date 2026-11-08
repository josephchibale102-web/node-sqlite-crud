CREATE TABLE IF NOT EXISTS clubs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    category VARCHAR(60),
    president_name VARCHAR(120),
    member_count INT,
    meeting_day VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*Populate Sample Records*/
INSERT INTO clubs (name, description, category, president_name, member_count, meeting_day) VALUES
('Computer Science Society', 'Coding, hackathons, and tech talks', 'Academic', 'Alice Mwansa', 45, 'Wednesday'),
('Debate Club', 'Sharpening public speaking and critical thinking', 'Intellectual', 'John Banda', 30, 'Friday'),
('Basketball Club', 'Campus hoops and inter-departmental tournaments', 'Sports', 'David Tembo', 20, 'Tuesday'),
('Drama and Theatre Arts', 'Stage plays, acting workshops, and improv', 'Arts', 'Grace Phiri', 25, 'Thursday'),
('Environmental Conservation Club', 'Tree planting and sustainability awareness', 'Social', 'Chola Mulenga', 50, 'Saturday'),
('Chess Club', 'Strategy board games and tournaments', 'Recreation', 'Bwalya Kasonde', 15, 'Monday'),
('Entrepreneurship Hub', 'Startup pitching and business mentorship', 'Professional', 'Mutinta Mweene', 40, 'Wednesday'),
('Music and Choir', 'Vocal training, instruments, and campus concerts', 'Arts', 'Lungu Phiri', 35, 'Friday'),
('Photography Club', 'Camera techniques, editing, and photo walks', 'Recreation', 'Kondwani Zulu', 22, 'Thursday'),
('Red Cross Society', 'First aid training and community health outreach', 'Volunteering', 'Thandiwe Soko', 60, 'Saturday');