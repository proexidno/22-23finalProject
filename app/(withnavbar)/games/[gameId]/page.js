"use client";
import { Input } from "components/ui/input"
import { Button } from "components/ui/button"
import { useEffect, useRef } from "react";



export default function Page({ params }) {
    useEffect(() => {
        const f = async () => {
            const response = await fetch(`http://localhost:3000/games/${params.gameId}/startgame`, {
                "method": 'POST',
                "body": JSON.stringify({ ok: false, game_id: params.gameId }),
                "cache": "no-store"
            })
            const res = await response.json()
            return res
        }
        f().then(console.log)
    }, [])

    const inputRef = useRef("");

    function checkIfValid(eq) {
        eq = eq.replaceAll("! ", "factorial");
        eq = eq.replaceAll(" ", "");
        eq = eq.replaceAll("factorial", "! ");
        console.log(eq);


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
        console.log(true);
        return true
    }

    async function sendMathEq() {
        if (checkIfValid(inputRef.current)) {
            let equation = inputRef.current
            let res = await fetch("http://localhost:3000/api/eqChecker/", {
                "method": "POST",
                body: JSON.stringify({ equation }),
                "cache": 'no-store',
                "headers": { "Content-Type": "application/json" },
            })
            console.log(await res.json());
        }
    }

    return (
        <div className="border-2 rounded-xl h-96 grid items-center relative">
            <div className="mx-8">
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
