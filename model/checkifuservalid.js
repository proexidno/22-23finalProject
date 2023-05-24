import Database from "better-sqlite3";
import Base64 from 'crypto-js/enc-base64.js';
import hmacSHA256 from "crypto-js/sha256.js";

export default function CheckIfUserValid(login, inputPassword) {

    const db = new Database("model/EqualityMastermindDB.db")

    const { password, salt } = db.prepare(`SELECT password, salt FROM Users WHERE login = ? OR email = ?`).get(login, login)

    if (!password || !salt) {
        return { error: "User does not exists" }
    }

    const passwordHash = Base64.stringify(hmacSHA256(inputPassword, salt))

    if (passwordHash !== password) {
        return { error: "Wrong credentials" }
    }

    const res = db.prepare(`SELECT id, login FROM Users WHERE login = ?`).get(login)

    db.close();

    return { ok: true, user: res }
}