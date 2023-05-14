import { NextResponse } from "next/server";
import GetUserGlobalData from "model/getuserglobaldata";


export async function POST(req) {
    
    const { user_id } = await req.json()

    const userData = GetUserGlobalData(user_id)
    
    return NextResponse.json(userData)
}