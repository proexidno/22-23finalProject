import Database from "better-sqlite3";

export default function registerNewUser(login, password, email) {

        const db = new Database("model/EqualityMastermindDB.db", { verbose: console.log })

        const newId = db.prepare(`SELECT COUNT(*) + 1 as count FROM Users`).get().count
        try {
                db.prepare(`INSERT INTO Users (id, login, email, password) Values ((?), (?), (?), (?))`).run(newId, login, password, email)
        } catch (SqliteError) {
                if (SqliteError.code === SQLITE_CONSTRAINT_UNIQUE) return { ok: false, error: "User already exists" }
        }

        db.prepare(`INSERT INTO Online_Statistics (id, user_id) Values ((?), (?))`).run(newId, newId)

        db.prepare(`INSERT INTO Offline_Statistics (id, user_id) Values ((?), (?))`).run(newId, newId)

        db.close()

        return { ok: true }
}