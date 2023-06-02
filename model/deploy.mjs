import Database from "better-sqlite3";
import RegisterNewUser from "./newuser.mjs"
import newEq from "./neweq.mjs";
import NewDocsEntry from "./newdocumentation.mjs";
import { Documentations } from "./documentation.mjs";

export default function deploy() {

    const db = new Database("model/EqualityMastermindDB.db")

    db.prepare(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY,
        login STRING NOT NULL UNIQUE,
        email STRING NOT NULL UNIQUE,
        salt STRING NOT NULL,
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
        level INTEGER NOT NULL DEFAULT 1,
        progression INTEGER NOT NULL DEFAULT 0,
        total_games INTEGER NOT NULL DEFAULT 0,
        max_progression INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES Users (id))`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS Online_Games (
        game_id INTEGER PRIMARY KEY,
        user1_id INTEGER NOT NULL,
        user2_id INTEGER NOT NULL,
        equation STRING NOT NULL,
        game_state STRING NOT NULL,
        user_won INTEGER,
        FOREIGN KEY (user1_id) REFERENCES Users (id),
        FOREIGN KEY (user2_id) REFERENCES Users (id),
        FOREIGN KEY (user_won) REFERENCES Users (id))`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS Offline_Games (
        game_id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        equation STRING NOT NULL,
        time INTEGER,
        time_before_left INTEGER,
        FOREIGN KEY (user_id) REFERENCES Users (id))`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS Equations (
        eq_id INTEGER PRIMARY KEY,
        equation STRING NOT NULL,
        level INTEGER NOT NULL)`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS Documentation (
        entry_id INTEGER PRIMARY KEY,
        access_level INTEGER NOT NULL UNIQUE,
        title STRING NOT NULL,
        description STRING NOT NULL,
        short_description STRING NOT NULL)`).run()

    RegisterNewUser("admin123", "1234", "example@gmail.com");

    newEq("_==0", 0);
    newEq("_==15", 1);
    newEq("_==23458", 2);
    newEq("2+_==4", 3);
    newEq("2-2==_", 4);
    newEq("_+(-2)==0", 5);
    newEq("2*_==4", 6);
    newEq("2/2==_", 7);
    newEq("2/(2+3)>=_", 8);
    newEq("9>_", 9);
    newEq("2^_==4", 10);
    newEq("sqrt(_)==5", 11);
    newEq("4! ==_", 12);
    newEq("sum(a,2,3,_)==5", 13);

    Documentations.forEach((e, index) => {
        NewDocsEntry(index, e.title, e.description, e.short_description)
    })
    db.close();

    return true
}

deploy();