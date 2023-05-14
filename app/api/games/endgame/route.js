import { NextResponse } from "next/server";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth"
import { UpdateOfflineGame, EndOfflineGame } from "model/changegame";
import CheckEquation from "model/eqchecker"

export async function POST(req) {
    const { reason, gameId, time_before_left, equation } = await req.json()

    const res = await getServerSession(authOptions)

    if (!res?.user) {
        return NextResponse.json({ error: "You have to be authorized" })
    }

    const { user } = res

    if (gameId === "offline") {
        const answer = CheckEquation(equation)
        if (reason === "Left the game") {
            if (answer) {
                const right = EndOfflineGame(user.id, time_before_left, equation)
                return NextResponse.json({ right })
            }
            EndOfflineGame(user.id, time_before_left, null)
            return NextResponse.json({ right: false })
        } else {
            if (answer) {
                const right = UpdateOfflineGame(user.id, time_before_left, equation)
                return NextResponse.json({ right, time_before_sent: time_before_left })
            }
            return NextResponse.json({ right: false, time_before_sent: time_before_left })
        }
    }

    if (Number(gameId) === NaN) {
        return NextResponse.json({ ok: false, error: "Incorrect game id" })
    }

    return NextResponse.json({ ok: false, error: "Not avaliable" })
}