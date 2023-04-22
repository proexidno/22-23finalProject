import Database from "better-sqlite3";
import { NextResponse } from "next/server";

export default async function CheckIfUserValid(login, password) {

    const db = new Database("model/EqualityMastermindDB.db")

    const isInDB = db.prepare(`SELECT password FROM Users WHERE login = ?`).get(login)
    if (!isInDB) {
        return NextResponse.json({ error: "User does not exists"})
    }
    if (!isInDB.password === password) {
        return NextResponse.json({ error: "Wrong credentials"});
    }
    const res = db.prepare(`SELECT u.login, offs.level, offs.progression, offs.max_progression, onns.rating FROM Users as u 
    LEFT JOIN Offline_Statistics as offs ON u.id = offs.user_id
    LEFT JOIN Online_Statistics as onns ON u.id = onns.user_id
    WHERE login = ?`).get(login)
    
    db.close();

    return NextResponse.json(res);
}