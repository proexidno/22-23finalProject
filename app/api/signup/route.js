import { NextResponse } from "next/server";
import RegisterNewUser from "model/makenewuser.mjs";

export async function POST(req) {
    const { login, password, email } = await req.json()

    const answer = RegisterNewUser(login, password, email);

    return NextResponse.json(answer)
}