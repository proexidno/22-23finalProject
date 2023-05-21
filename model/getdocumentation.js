import Database from "better-sqlite3";
export default function GetDocumentation(level) {

    const db = new Database("model/EqualityMastermindDB.db")
    
    const documentationResponse = db.prepare(`SELECT title, description FROM Documentation WHERE access_level = ?`).get(level)

    db.close()
    
    return documentationResponse
}