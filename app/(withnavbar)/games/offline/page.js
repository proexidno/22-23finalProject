"use client";
import { Input } from "components/ui/input"
import { Button } from "components/ui/button"
import { useEffect, useRef, useState } from "react";
import { useToast } from "components/ui/use-toast";
import CheckEquation from "model/eqchecker";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {

    const router = useRouter()
    const inputRef = useRef("");
    const [equation, setEquation] = useState("")
    const [time, setTime] = useState(0)
    const [unavailableSignsString, setUnavailableSignsString] = useState("")
    const timeRef = useRef(time)

    const { toast } = useToast()

    useEffect(() => {

        async function resumegame() {
            const response = await fetch(`http://localhost:3000/api/games/startgame`, {
                "method": 'POST',
                "body": JSON.stringify({}),
                "next": { revalidate: 300 }
            })
            const res = await response.json()
            return res
        }

        let timerInterval;
        resumegame().then(e => {
            if (e.error) {

            }

            setEquation(e.equation)
            setUnavailableSignsString(e.unavailableString)
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
            if (isNaN(timeRef.current)) {
                return;
            }
            fetch(`http://localhost:3000/api/games/endgame`, {
                "method": 'POST',
                "body": JSON.stringify({ reason: "Left the game", time_before_left: timeRef.current, equation: inputRef.current }),
                "cache": "no-store"
            })
        }
    }, [])

    function checkIfValid(eq) {
        eq = eq.replaceAll("! ", "factorial");
        eq = eq.replaceAll(" ", "");
        eq = eq.replaceAll("factorial", "! ");
        if (eq.includes("_")) {

            return false
        }

        if (eq.includes("!=")) {
            return false
        }

        let bracets = 0
        for (let i of eq) {
            if (bracets < 0) {

                return false
            }
            if (i === "(") bracets++
            else if (i === ")") bracets--
        }
        if (bracets !== 0) {

            return false
        }


        let set = new Set(eq)
        const signs = ["+", "-", "*", "^", "/", "=", ">", "<", "!", "(", ")"]
        for (let i of set) {
            if (i.match(/\d|\s/)) continue

            if (signs.includes(i)) continue

            if (eq.includes(`sum(${i}`)) continue

            if ("sqrtum".includes(i) && (eq.includes("sqrt(") || eq.includes("sum("))) continue

            if (i === "," && eq.includes("sum(")) continue



            return false
        }


        if (eq.match(/\s!/) || eq.startsWith("!")) {

            return false
        }


        for (let i of ["+", "-"]) {
            if (eq.includes(i + ")") || eq.endsWith(i)) {

                return false
            }
        }


        for (let i of ["*", "^", "(", "="]) {
            if (eq.includes(i + ")") || eq.endsWith(i) || eq.startsWith(i)) {

                return false
            }
        }


        if (eq === "") {

            return false
        }

        return true
    }

    function levelChecker(eq) {

        if (!unavailableSignsString) {
            return false
        }

        if (unavailableSignsString.includes("sum") && eq.includes("sum") || unavailableSignsString.includes("sqrt") && eq.includes("sqrt")) {

            return false
        }

        if (unavailableSignsString.includes("<=") && eq.includes("<=") || unavailableSignsString.includes(">=") && eq.includes(">=")) {

            return false
        }

        const set = new Set(eq)
        for (let i of unavailableSignsString) {
            if ("=<>sumqrt".includes(i)) {
                continue
            }
            if (set.has(i)) {

                return false
            }
        }

        return true
    }


    async function CheckMathEq() {
        if (timeRef.current === -1 || isNaN(timeRef.current)) {
            return ""
        }

        if (!levelChecker(inputRef.current)) {
            toast({
                title: "Error",
                description: "You have an insufficient level for some of written signs",
            })

            timeRef.current = time
            return;
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
        const EqRegexp = new RegExp(`^${equation.replaceAll(/[+*()^]/g, str => `\\${str}`).replaceAll("_", "[()a-zA-Z0-9,.\\-+^*/ !]+")}$`)
        const isEquationSimilarToOriginal = inputRef.current.match(EqRegexp)

        if (!isEquationSimilarToOriginal) {
            toast({
                title: "Error",
                description: "Your equation isn't simlar to given",
            })

            timeRef.current = time
            return;
        }

        const eqationAnswer = CheckEquation(inputRef.current)

        if (!eqationAnswer) {
            toast({
                title: "Error",
                description: "Your equation is wrong or it isn't the equation",
            })

            timeRef.current = time
            return;
        }

        const response = await fetch(`http://localhost:3000/api/games/endgame`, {
            "method": 'POST',
            "body": JSON.stringify({ reason: "Answered", time_before_left: time, equation: inputRef.current }),
            "cache": "no-store"
        })
        const res = await response.json()

        if (!res?.right) {
            toast({
                title: "Error",
                description: "Something's gone wrong on the server",
            })

            timeRef.current = time
            return;
        }

        timeRef.current = NaN

        setTime((prev) => res?.time_before_sent == prev ? prev - 1 : res.time_before_sent)
    }

    return (
        <>
            <main className={`pt-48 md:pt-20 lg:pt-24 lg:w-256 mx-auto ${isNaN(timeRef.current) ? "blur" : ""}`}>
                <div className="border-2 rounded-xl h-96 grid items-center relative">
                    <div className="mx-8">
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
            </main>
            <div className={`grid absolute top-0 left-0 w-full h-full items-center ${!isNaN(timeRef.current) ? "hidden" : ""}`}>
                <dialog open={isNaN(timeRef.current) ? true : null} className="bg-white rounded-xl w-96 border-2 px-2">
                    <h1 className="text-center text-xl mt-4">You won!</h1>
                    <div className="grid gap-6 justify-around grid-rows-1 grid-flow-col mt-4">
                        <Link href="/" className="inline-flex items-center justify-center rounded-md text-white bg-black h-10 py-2 px-4">Leave to main page</Link>
                    </div>
                </dialog>
            </div>
        </>
    )
}
