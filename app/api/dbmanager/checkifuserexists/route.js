import { NextResponse } from "next/server";
import CheckIfUserValid from "model/checkifuservalid";

export async function POST(req) {
    const { login, password } = await req.json()
    if (!process.env.NEXTAUTH_URL.includes(req.nextUrl.hostname)) {
        return NextResponse.json(null)
    }
    return await CheckIfUserValid(login, password)
}