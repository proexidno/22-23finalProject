import Database from "better-sqlite3";

export default function newEq(eq, level) {

    const db = new Database("model/EqualityMastermindDB.db", { verbose: console.log })

    db.prepare(`INSERT INTO Equations (equation, level) VALUES (?, ?)`).run(eq, level)

    db.close();
    
    return { "ok": true }

}