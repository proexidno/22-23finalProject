import { NextResponse } from "next/server";
import GetUserGlobalData from "model/getuserglobaldata";
import GetDocumentation from "model/getdocumentation"

export async function POST(req) {

    const { user_id, user, docs } = await req.json()
    let data;

    if (user) {

        data = GetUserGlobalData(user_id)
        if (docs) {
            
            const { title, description } = GetDocumentation(data.level);
            data.title = title, data.description = description
        }
    }

    return NextResponse.json(data)
}