import Database from "better-sqlite3";

export default function RegisterNewUser(login, password, email) {

        const db = new Database("model/EqualityMastermindDB.db", { verbose: console.log })

        const newId = db.prepare(`SELECT COUNT(*) + 1 as count FROM Users`).get().count
        try {
                db.prepare(`INSERT INTO Users (id, login, email, password) Values (?, ?, ?, ?)`).run(newId, login, email, password)
        } catch (SqliteError) {
                if (SqliteError.code === "SQLITE_CONSTRAINT_UNIQUE") return { ok: false, error: "User with this login or email   already exists" }
        }

        db.prepare(`INSERT INTO Online_Statistics (user_id) Values (?)`).run(newId)

        db.prepare(`INSERT INTO Offline_Statistics (user_id) Values (?)`).run(newId)

        db.close()

        return { ok: true }
}