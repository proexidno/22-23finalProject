import Database from "better-sqlite3";

export function NewOnlineGame() {

    const db = new Database("model/EqualityMastermindDB.db", { verbose: console.log })

    db.close()

    return { ok: false, error: "not available" }
}

export function NewOfflineGame(user_id, level) {

    const db = new Database("model/EqualityMastermindDB.db", { verbose: console.log })

    let equations = db.prepare(`SELECT * FROM Equations WHERE level <= ? AND ? - 6 <= level`).all(level, level)

    const randomEq = equations[Math.floor(Math.random() * equations.length)]

    db.prepare(`INSERT INTO Offline_Games (user_id, equation_id) VALUES (?, ?)`).run(user_id, randomEq.eq_id)

    db.close()

    return { ok: true }
}
