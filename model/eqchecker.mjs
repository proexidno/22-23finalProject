import { evaluate } from "mathjs"

function doSum(str) {
    let splited = []
    let prevcoma = 0
    let i = 0

    while (splited.length < 3) {
        if (str[i] === ",") {
            splited.push(str.slice(prevcoma, i))
            prevcoma = i + 1
        } else if (str[i] === "(") {
            let bracets = 1
            while (bracets > 0) {
                i++
                if (str[i] === "(") bracets++
                else if (str[i] === ")") bracets--
            }
        }
        i++
    }
    splited.push(str.slice(prevcoma))
    
    const rino = splited.map(e => equationCollector(e))
    let answ = "("
    for (let ind = Number(rino[1]); ind <= Number(rino[2]); ind++) {
        answ += rino[3].replaceAll(rino[0], String(ind)) + "+"
    }

    answ = answ.slice(0, -1) + ")"
    
    return answ
}

function equationCollector(equation) {
    if (equation.includes("sum(")) {
        const exec = equation.indexOf("sum(")
        let i = exec + 3
        let bracets = 1
        while (bracets > 0 && equation[i + 1] !== undefined) {
            i++
            if (equation[i] === "(") bracets++
            else if (equation[i] === ")") bracets--
        }

        const didSum = doSum(equation.slice(exec + 4, i))
        try {
            if (didSum.match(/[a-zA-Z]/)) {
                return equation.slice(0, exec) + didSum + equation.slice(i + 1)
            }
            return evaluate(equation.slice(0, exec) + didSum + equation.slice(i + 1))
        } catch (err) {
            return equation.slice(0, exec) + didSum + equation.slice(i + 1)
        }

    }

    
    try {
        equation = equation.replaceAll("sqrt(", "$#$#$")
        if (equation.match(/[a-zA-Z]/)) {
            equation = equation.replaceAll("$#$#$", "sqrt(")
            return equation
        }
        equation = equation.replaceAll("$#$#$", "sqrt(")
        return evaluate(equation)
    } catch (err) {
        return equation
    }
}

export default function CheckEquation(eq) {
    const equed = equationCollector(eq)
    if (typeof equed !== "boolean") {
        return false
    }
    return equed
}