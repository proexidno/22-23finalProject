import { NextResponse } from "next/server";
import GetDocumentation from "model/getdocumentation";

export async function POST(req, { params }) {

    const { level } = await req.json()

    const docs = GetDocumentation(level);
    
    return NextResponse.json({ docs: docs })
}