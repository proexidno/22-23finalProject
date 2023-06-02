import Database from "better-sqlite3";

export function NewOnlineGame() {

    const db = new Database("model/EqualityMastermindDB.db")

    db.close()

    return { ok: false, error: "not available" }
}

export function NewOfflineGame(user_id) {

    const db = new Database("model/EqualityMastermindDB.db")

    const { level } = db.prepare(`SELECT level FROM Offline_Statistics WHERE user_id = ?`).get(user_id)

    const equations = db.prepare(`SELECT * FROM Equations WHERE (level <= ? AND level > ? - 4) OR 13 = ?`).all(level, level, level)
    
    const random = Math.random()
    
    const randomEq = equations[Math.floor(random * equations.length)]

    let equation = randomEq.equation

    db.prepare(`INSERT INTO Offline_Games (user_id, equation) VALUES (?, ?)`).run(user_id, equation)

    db.close()

    return { equation, level }
}
