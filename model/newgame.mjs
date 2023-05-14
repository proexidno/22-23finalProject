import Database from "better-sqlite3";

export function NewOnlineGame() {

    const db = new Database("model/EqualityMastermindDB.db", { verbose: console.log })

    db.close()

    return { ok: false, error: "not available" }
}

export function NewOfflineGame(user_id, level) {

    const db = new Database("model/EqualityMastermindDB.db")

    let equations = db.prepare(`SELECT * FROM Equations WHERE level <= ? AND ? - 6 <= level`).all(level, level)

    const randomEq = equations[Math.floor(Math.random() * equations.length)]

    let equation = randomEq.equation

    db.prepare(`INSERT INTO Offline_Games (user_id, equation) VALUES (?, ?)`).run(user_id, equation)

    db.close()

    return equation
}
