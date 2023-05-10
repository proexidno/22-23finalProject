import { CheckIfOnlineGameExists, NewGameId, CheckIfOfflineGameExists } from "model/checkifgameexists"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "app/api/auth/[...nextauth]/route";

export async function POST(req, res) {

    const data = await getServerSession(authOptions)

    console.log(data);  

    let request = await req.json()


    if (1 === "offline") {
        return NextResponse.json({ ok: false, error: "Not avaliable" })
    }

    if (Number("1") === NaN) {
        return NextResponse.json({ ok: false, error: "Incorrect game id" })
    }

    let gameExists = CheckIfOnlineGameExists(request?.game_id)

    if (!gameExists.ok) {
        return NextResponse.json({ error: gameExists?.error })
    }

    return NextResponse.json({ ok: false, error: "Not avaliable" })
}