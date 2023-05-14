"use client";
import { Input } from "components/ui/input"
import { Button } from "components/ui/button"
import { useEffect, useRef, useState } from "react";
import { useToast } from "components/ui/use-toast";

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
        const signs = ["+", "-", "*", "^", "/", "=", ">", "<", "!"]
        for (let i of set) {
            if (i.match(/\d|\s/)) {
                continue
            }
            if (eq.indexOf(`sum(${i}`) + 1) {
                continue
            }
            if (signs.includes(i)) {
                continue
            }
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
            setTime(e.time_before_left ? e.time_before_left : 0)
            timerInterval = setInterval(() => {
                if (isNaN(timeRef.current)) {
                    clearInterval(timerInterval)
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

    async function sendMathEq() {
        if (checkIfValid(inputRef.current) && !isNaN(timeRef.current)) {
            const response = await fetch(`http://localhost:3000/api/games/endgame`, {
                "method": 'POST',
                "body": JSON.stringify({ reason: "Answered", gameId: params.gameId, time_before_left: timeRef.current, equation: inputRef.current }),
                "cache": "no-store"
            })
            const { right, time_before_sent } = await response.json()
            if (right) {
                timeRef.current = NaN
                setTime(time_before_sent)
            } else {
                toast({
                    title: "Error",
                    description: "Your equation is wrong or it isn't simlar to given",
                })
            }
        }
    }

    return (
        <div className="border-2 rounded-xl h-96 grid items-center relative">
            {isNaN(timeRef.current) ? "" : "hidden"}
            <div className="mx-8">
                <h1>{isNaN(time) ? "" : (time / 10).toFixed(1)}</h1>
                <p className="m-8 text-xl font-bold text-center">
                    {equation}
                </p>
                <Input onChange={e => {
                    inputRef.current = e.target.value
                }} placeholder="Yout mathematical equation" />
            </div>
            <div className="absolute bottom-4 right-8">
                <Button onClick={sendMathEq}>Send</Button>
            </div>
        </div>
    )
}
