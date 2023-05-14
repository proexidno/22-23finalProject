import Database from "better-sqlite3";

export function CheckIfOnlineGameExists(id) {

    const db = new Database("model/EqualityMastermindDB.db")

    const Online = db.prepare(`SELECT game_id FROM Online_Games`).all()


    if (Online.map(e => e.game_id).includes(id)) {
        return true
    }

    db.close()

    return false
}
export function CheckIfOfflineGameExists(user_id) {

    const db = new Database("model/EqualityMastermindDB.db")

    const Offline = db.prepare(`
    SELECT equation, time_before_left FROM Offline_Games
    WHERE user_id = ? AND time IS NULL
    `).all(user_id)

    if (Offline.length > 1) {
        return "Too many offline games"
    }
    if (Offline.length === 1) {
        return Offline[0]
    }

    db.close()

    return false
}

export function NewOnlineGameId() {

    const db = new Database("model/EqualityMastermindDB.db")

    const Online = db.prepare(`SELECT game_id FROM Online_Games`).all()

    db.close()

    return Math.max(Online.map(e => e.game_id)) + 1
}