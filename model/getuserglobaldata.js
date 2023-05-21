import Database from "better-sqlite3";

export default function GetUserGlobalData(user_id) {
    
    const db = new Database("model/EqualityMastermindDB.db")

    const userData = db.prepare(`SELECT offs.level, offs.progression, offs.max_progression, onns.rating FROM Offline_Statistics AS offs, Online_Statistics AS onns
    WHERE offs.user_id = ? AND onns.user_id = ?`).get(user_id, user_id)

    return userData
}