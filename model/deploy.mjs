import Database from "better-sqlite3";
import registerNewUser from "./makenewuser.mjs"
import newEq from "./neweq.mjs";

export default function deploy() {

    const db = new Database("model/EqualityMastermindDB.db", { verbose: console.log })

    db.prepare(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY,
        login STRING NOT NULL UNIQUE,
        email STRING NOT NULL UNIQUE,
        password STRING NOT NULL)`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS Online_Statistics (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL UNIQUE,
        rating INTEGER DEFAULT 0,
        won_matches INTEGER DEFAULT 0,
        lost_matches INTEGER DEFAULT 0,
        games_count INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES Users (id))`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS Offline_Statistics (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL UNIQUE,
        level INTEGER NOT NULL DEFAULT 0,
        progression INTEGER NOT NULL DEFAULT 0,
        max_progression INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES Users (id))`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS Online_Games (
        game_id INTEGER PRIMARY KEY,
        user1_id INTEGER NOT NULL,
        user2_id INTEGER NOT NULL,
        equation_id INTEGER NOT NULL,
        game_state STRING NOT NULL,
        user_won INTEGER,
        FOREIGN KEY (user1_id) REFERENCES Users (id),
        FOREIGN KEY (user2_id) REFERENCES Users (id),
        FOREIGN KEY (user_won) REFERENCES Users (id),
        FOREIGN KEY (equation_id) REFERENCES Equations (eq_id))`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS Offline_Games (
        game_id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        equation_id INTEGER NOT NULL,
        time INTEGER,
        FOREIGN KEY (user_id) REFERENCES Users (id),
        FOREIGN KEY (equation_id) REFERENCES Equations (eq_id))`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS Equations (
        eq_id INTEGER PRIMARY KEY,
        equation STRING NOT NULL,
        level INTEGER NOT NULL)`).run()

    registerNewUser("admin123", "1234", "example@gmail.com");

    newEq("0==0", 0);
    newEq("2+2==4", 1);
    newEq("2-2==0", 4);
    newEq("2+(-2)==0", 5);
    newEq("2*2==4", 6);
    newEq("2/2==1", 7);
    newEq("9>0", 9);
    newEq("2^2==4", 10);
    newEq("sqrt(25)==5", 11);
    newEq("4! ==24", 12);
    newEq("sum(a,2,3,a)==5", 13);

    db.close();

    return { "ok": true }
}

deploy();