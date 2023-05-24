import Database from "better-sqlite3";
import Base64 from 'crypto-js/enc-base64.js';
import hmacSHA256 from "crypto-js/sha256.js";

function randString(length) {
        var salt = ""
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_+"
        for (let i = 0; i < length; i++) {
                salt += chars[Math.floor(Math.random()*64)]
        }
        return salt
}

export default function RegisterNewUser(login, password, email) {

        const db = new Database("model/EqualityMastermindDB.db", { verbose: console.log })

        const salt = randString(32)

        const hashedPassword = Base64.stringify(hmacSHA256(password, salt))

        const newId = db.prepare(`SELECT COUNT(*) + 1 as count FROM Users`).get().count

        try {
                db.prepare(`INSERT INTO Users (id, login, email, password, salt) Values (?, ?, ?, ?, ?)`).run(newId, login, email, hashedPassword, salt)
        } catch (SqliteError) {
                console.log(SqliteError);
                if (SqliteError.code === "SQLITE_CONSTRAINT_UNIQUE") return { ok: false, error: "User with this login or email   already exists" }
        }

        db.prepare(`INSERT INTO Online_Statistics (user_id) Values (?)`).run(newId)

        db.prepare(`INSERT INTO Offline_Statistics (user_id) Values (?)`).run(newId)

        db.close()

        return true
}