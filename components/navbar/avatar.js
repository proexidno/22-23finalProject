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
        <div className="grid place-content-center md:place-content-end gap-3 box-content grid-rows-1 grid-flow-col lg:py-2 md:py-0 py-0">
            {
                data?.user ?
                    (
                        <Button>
                            <a href="/api/auth/signout">Sign Out</a>
                        </Button>
                    ) : (
                        <>
                            <Button onClick={signUp}>
                                Sign up
                            </Button>
                            <Button onClick={signIn}>
                                Sign In
                            </Button>
                        </>
                    )
            }
        </div>
    )
}
