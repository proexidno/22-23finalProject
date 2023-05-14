import Database from "better-sqlite3";

export default function CheckIfUserValid(login, password) {

    const db = new Database("model/EqualityMastermindDB.db")

    const isInDB = db.prepare(`SELECT password FROM Users WHERE login = ?`).get(login)

    if (!isInDB) {
        return { error: "User does not exists" }
    }

    if (isInDB.password != password) {
        return { error: "Wrong credentials" }
    }

    const res = db.prepare(`SELECT id, login FROM Users WHERE login = ?`).get(login)

    db.close();

    return { ok: true, user: res }
}