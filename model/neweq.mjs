import Database from "better-sqlite3";

export default function newEq(eq, level) {

    const db = new Database("model/EqualityMastermindDB.db")

    db.prepare(`INSERT INTO Equations (equation, level) VALUES (?, ?)`).run(eq, level)

    db.close();
    
    return true

}