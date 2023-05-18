"use client";
import { Input } from "components/ui/input"
import { Button } from "components/ui/button"
import { useEffect, useRef, useState } from "react";
import { useToast } from "components/ui/use-toast";
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

export default function Page({ params }) {

    const inputRef = useRef("");
    const [equation, setEquation] = useState("")
    const [time, setTime] = useState(0)
    const timeRef = useRef(time)

    const { toast } = useToast()

    function checkIfValid(eq) {
        eq = eq.replaceAll("! ", "factorial");
        eq = eq.replaceAll(" ", "");
        eq = eq.replaceAll("factorial", "! ");
        if (eq.includes("_")) {
            console.log(0);
            return false
        }

        let bracets = 0
        for (let i of eq) {
            if (bracets < 0) {
                console.log(1);
                return false
            }
            if (i === "(") bracets++
            else if (i === ")") bracets--
        }
        if (bracets !== 0) {
            console.log(2);
            return false
        }


        let set = new Set(eq)
        const signs = ["+", "-", "*", "^", "/", "=", ">", "<", "!", "(", ")"]
        for (let i of set) {
            if (i.match(/\d|\s/)) {
                continue
            }
            if (signs.includes(i)) {
                continue
            }
            console.log(i);
            console.log(3);
            return false
        }


        if (eq.match(/\s!/) || eq.startsWith("!")) {
            console.log(4);
            return false
        }


        for (let i of ["+", "-"]) {
            if (eq.includes(i + ")") || eq.endsWith(i)) {
                console.log(5);
                return false
            }
        }


        for (let i of ["*", "^", "(", "="]) {
            if (eq.includes(i + ")") || eq.endsWith(i) || eq.startsWith(i)) {
                console.log(6);
                return false
            }
        }


        if (eq === "") {
            console.log(7);
            return false
        }

        return true
    }

    useEffect(() => {

        async function resumegame() {
            const response = await fetch(`http://localhost:3000/api/games/startgame`, {
                "method": 'POST',
                "body": JSON.stringify({ gameId: params.gameId }),
                "next": { revalidate: 300 }
            })
            const res = await response.json()
            return res
        }

        let timerInterval;
        resumegame().then(e => {
            if (e.error) {
                console.log(e.error);
            }
            setEquation(e.equation)
            document.querySelector("#eqinput").value = e.equation
            setTime(e.time_before_left ? e.time_before_left : 0)
            timerInterval = setInterval(() => {
                if (isNaN(timeRef.current)) {
                    clearInterval(timerInterval)
                    return;
                }
                if (timeRef.current === -1) {
                    return;
                }
                setTime(prevTime => {
                    timeRef.current = prevTime
                    return ++prevTime
                })
            }, 100)
        })

        return async () => {
            clearInterval(timerInterval)
            fetch(`http://localhost:3000/api/games/endgame`, {
                "method": 'POST',
                "body": JSON.stringify({ reason: "Left the game", gameId: params.gameId, time_before_left: timeRef.current, equation: inputRef.current }),
                "cache": "no-store"
            })
        }
    }, [])

    async function CheckMathEq() {
        if (timeRef.current === -1) {
            return ""
        }

        timeRef.current = -1
        if (!checkIfValid(inputRef.current) || isNaN(timeRef.current)) {
            toast({
                title: "Error",
                description: "There's typing error in your equation",
            })
            timeRef.current = time
            return;
        }
        const EqRegexp = new RegExp(`^${equation.replaceAll(/[+*()]/g, str => `\\${str}`).replaceAll("_", "[()a-zA-Z0-9,.\\-+^*/ !]+")}$`)
        const isEquationSimilarToOriginal = inputRef.current.match(EqRegexp)

        if (!isEquationSimilarToOriginal) {
            toast({
                title: "Error",
                description: "Your equation isn't simlar to given",
            })
            timeRef.current = time
            return;
        }

        const eqationAnswer = equationCollector(inputRef.current)

        if (!eqationAnswer || typeof eqationAnswer !== "boolean") {
            toast({
                title: "Error",
                description: "Your equation is wrong or it isn't the equation",
            })
            timeRef.current = time
            return;
        }
        
        const response = await fetch(`http://localhost:3000/api/games/endgame`, {
            "method": 'POST',
            "body": JSON.stringify({ reason: "Answered", gameId: params.gameId, time_before_left: time, equation: inputRef.current }),
            "cache": "no-store"
        })
        const res = await response.json()
        if (res?.right) {
            timeRef.current = NaN
            setTime((prev) => res?.time_before_sent == prev ? prev - 1 : res.time_before_sent)
        }
    }

    return (
        <div className="border-2 rounded-xl h-96 grid items-center relative">
            <div className="mx-8">
                <div className={isNaN(timeRef.current) ? "" : "hidden"}>You won</div>
                <h1>{(time / 10).toFixed(1)}</h1>
                <p className="m-8 text-xl font-bold text-center">
                    {equation}
                </p>
                <Input id="eqinput" onChange={e => {
                    inputRef.current = e.target.value
                }} placeholder="Yout mathematical equation" />
            </div>
            <div className="absolute bottom-4 right-8">
                <Button onClick={CheckMathEq}>Send</Button>
            </div>
        </div>
    )
}
