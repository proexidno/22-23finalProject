import { evaluate } from "mathjs"
import { NextResponse } from "next/server"

function doSum(str) {
    const splited = str.split(",", 3)
    str = str.replace(splited.join(",") + ",", "").slice(0, -1)
    const rino = [...splited, str].map(e => equationCollector(e))
    let answ = "("
    for (let ind = Number(rino[1]); ind <= Number(rino[2]); ind++) {
        answ += rino[3].replaceAll(rino[0], String(ind)) + "+"
    }
    return answ.slice(0, -1) + ")"
}

function equationCollector(equation) {
    if (equation.includes("sum(")) {
        exec = equation.indexOf("sum(")
        let i = exec + 3
        let bracets = 0
        do {
            if (equation[i] === "(") bracets++
            else if (equation[i] === ")") bracets--
            i++
        } while (bracets > 0);
        return equation.slice(0, exec) + "(" + doSum(equation.slice(exec + 4, i)) + ")" + equation.slice(i)
    }
    return equation
}

export async function POST(req) {
    const { equation } = await req.json()
    const eq = equationCollector(equation)
    const equationcheck = evaluate(eq)
    return NextResponse.json({ equationcheck })
}