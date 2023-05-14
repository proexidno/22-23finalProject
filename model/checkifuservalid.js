import Database from "better-sqlite3";

export default function CheckIfUserValid(login, password) {
    console.log(login);
    const db = new Database("model/EqualityMastermindDB.db")

    const isInDB = db.prepare(`SELECT password FROM Users WHERE login = ?`).get(login)

    if (!isInDB) {
        return { error: "User does not exists" }
    }

    if (!isInDB.password === password) {
        return { error: "Wrong credentials" }
    }

    const res = db.prepare(`SELECT u.id, u.login, offs.level, offs.progression, offs.max_progression, onns.rating FROM Users as u 
    LEFT JOIN Offline_Statistics as offs ON u.id = offs.user_id
    LEFT JOIN Online_Statistics as onns ON u.id = onns.user_id
    WHERE login = ?`).get(login)

    db.close();

    console.log(res);

    return { ok: true, user: res }
}