import Database from "better-sqlite3";

export default function NewDocsEntry(level, title, description, short_description) {

        const db = new Database("model/EqualityMastermindDB.db", { verbose: console.log })

        db.prepare(`INSERT INTO Documentation (access_level, title, description, short_description) Values (?, ?, ?, ?)`).run(level, title, description, short_description)

        db.close()

        return true
}