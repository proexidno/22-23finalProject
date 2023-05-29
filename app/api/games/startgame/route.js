import { CheckIfOnlineGameExists, NewGameId, CheckIfOfflineGameExists } from "model/checkifgameexists"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { NewOfflineGame } from "model/newgame"

const leveling = ["12345", "6789", "+", "-", "()", "*", "/", "<=>=", "<>", "^", "sqrt", "!", "sum"]

export async function POST() {

    const res = await getServerSession(authOptions)

    if (!res?.user) {
        return NextResponse.json({ error: "You have to be authorized" })
    }

    const { user } = res

    const offlineGameRawInfo = CheckIfOfflineGameExists(user.id)
    
    if (offlineGameRawInfo) {
        
        return NextResponse.json({
            unavailableString: leveling.splice(offlineGameRawInfo.level).join(""),
            equation: offlineGameRawInfo.equation,
            time_before_left: offlineGameRawInfo.time_before_left,
        })
    }

    const { equation, level } = NewOfflineGame(user.id)
    
    return NextResponse.json({ equation, unavailableString: leveling.splice(level).join("") })
}