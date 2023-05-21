import { CheckIfOnlineGameExists, NewGameId, CheckIfOfflineGameExists } from "model/checkifgameexists"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { NewOfflineGame } from "model/newgame"

export async function POST(req) {

    const res = await getServerSession(authOptions)

    const { gameId } = await req.json()
    
    if (!res?.user) {
        return NextResponse.json({ error: "You have to be authorized" })
    }

    const { user } = res

    if (gameId === "offline") {
        if (CheckIfOfflineGameExists(user.id)) {
            return NextResponse.json(CheckIfOfflineGameExists(user.id))
        }
        const equation = NewOfflineGame(user.id)
        return NextResponse.json({ equation })
    }

    if (Number(gameId) === NaN) {
        return NextResponse.json({ ok: false, error: "Incorrect game id" })
    }

    let gameExists = CheckIfOnlineGameExists(game_id)

    if (!gameExists.ok) {
        return NextResponse.json({ error: gameExists?.error })
    }

    return NextResponse.json({ ok: false, error: "Not avaliable" })
}