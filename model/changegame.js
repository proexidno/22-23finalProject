import Database from "better-sqlite3";

export function UpdateOfflineGame(user_id, time, equation) {

    const db = new Database("model/EqualityMastermindDB.db")

    const { equation: originalEquation } = db.prepare(`SELECT equation FROM Offline_Games WHERE user_id = ? AND time IS NULL`).get(user_id)

    const isEquationSimilarToOriginal = equation.match(new RegExp(`^${originalEquation.replaceAll(/[+*()^]/g, str => `\\${str}`).replaceAll("_", "[()a-zA-Z0-9,.\\-+^*/ !]+")}$`))

    if (isEquationSimilarToOriginal) {
        
        db.prepare(`UPDATE Offline_Games SET time = ? WHERE user_id = ? AND time IS NULL`).run(time, user_id)
        
        GainExperience("offline", user_id)
        

        return true
    }
    

    db.close()

    return false
}

export function EndOfflineGame(user_id, time, equation) {

    const db = new Database("model/EqualityMastermindDB.db")


    if (equation === null) {

        db.prepare(`UPDATE Offline_Games SET time_before_left = ? WHERE user_id = ? AND time IS NULL`).run(time, user_id)

        return false
    } else {
        
        const { equation: originalEquation } = db.prepare(`SELECT equation FROM Offline_Games WHERE user_id = ? AND time IS NULL`).get(user_id)
        const isEquationSimilarToOriginal = equation.match(new RegExp(`^${originalEquation.replaceAll(/[+*()^]/g, str => `\\${str}`).replaceAll("_", "[()a-zA-Z0-9,.\\-+^*/ !]+")}$`))


        if (isEquationSimilarToOriginal) {

            db.prepare(`UPDATE Offline_Games SET time = ? WHERE user_id = ? AND time IS NULL`).run(time, user_id)

            GainExperience("offline", user_id)

            return true
        }
    }

    db.close()

    return false
}

const experience = [1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 7, 10, -1]

function GainExperience(type, user_id) {

    const db = new Database("model/EqualityMastermindDB.db")
    
    if (type === "offline") {
        let { level, progression, max_progression, total_games } = db.prepare(`SELECT level, progression, max_progression, total_games FROM Offline_Statistics WHERE user_id = ?`).get(user_id)
        if (experience[level] !== -1) {
            progression++
            total_games++
            if (progression >= max_progression) {
                level++
                progression = 0
                max_progression = experience[level]
            }
        }
        
        db.prepare(`UPDATE Offline_Statistics SET level = ?, progression = ?, max_progression = ?, total_games = ? WHERE user_id = ?`).run(level, progression, max_progression, total_games, user_id)
    }

    db.close()
}