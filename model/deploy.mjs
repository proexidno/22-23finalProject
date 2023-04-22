import Database from "better-sqlite3";

export default function deploy() {

    const db = new Database("model/EqualityMastermindDB.db", { verbose: console.log })
    
    db.prepare(`CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY,
            login STRING NOT NULL UNIQUE,
            email STRING NOT NULL UNIQUE,
            password STRING NOT NULL
        )
        `).run()
    db.prepare(`CREATE TABLE IF NOT EXISTS Online_Statistics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL UNIQUE,
            rating INTEGER DEFAULT 0,
            won_matches INTEGER DEFAULT 0,
            lost_matches INTEGER DEFAULT 0,
            games_count INTEGER DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES Users (id)
        )
        `).run()
    db.prepare(`CREATE TABLE IF NOT EXISTS Offline_Statistics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL UNIQUE,
            level INTEGER NOT NULL DEFAULT 0,
            progression INTEGER NOT NULL DEFAULT 0,
            max_progression INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY (user_id) REFERENCES Users (id)
        )
        `).run()
    db.prepare(`CREATE TABLE IF NOT EXISTS Online_Games (
            game_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user1_id INTEGER NOT NULL,
            user2_id INTEGER NOT NULL,
            game_state STRING NOT NULL,
            user_won STRING,
            FOREIGN KEY (user1_id) REFERENCES Users (id),
            FOREIGN KEY (user2_id) REFERENCES Users (id),
            FOREIGN KEY (user_won) REFERENCES Users (id)
        )
        `).run()

    db.close();
}