"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "components/ui/button"
import { useRouter } from "next/navigation";

export function Avatar() {

    const router = useRouter()
    function signUp() {
        router.push("http://localhost:3000/auth/signup")
    }
    const { data } = useSession()

    return (
        <div className="grid place-content-center md:place-content-end gap-3 box-content grid-rows-1 grid-flow-col lg:py-0 py-0">
            {
                data?.user ?
                    (
                        <Button>
                            <a href="/api/auth/signout">Sign Out</a>
                        </Button>
                    ) : (
                        <>
                            <div className="grid place-content-center">
                                <Button onClick={signUp}>
                                    Sign up
                                </Button>
                            </div>
                            <div className="grid place-content-center">
                                <Button onClick={signIn}>
                                    Sign in
                                </Button>
                            </div>
                        </>
                    )
            }
        </div>
    )
}
