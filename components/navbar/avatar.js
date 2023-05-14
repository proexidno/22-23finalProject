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
        <div className="flex justify-center md:justify-end [&>*]:px-3s py-2 box-content">
            {
                data?.user ? <Button>
                    <a href="http://localhost:3000/api/auth/signout">Sign Out</a>
                </Button> : (
                    <>
                        <Button onClick={signUp}>
                            Sign up
                        </Button>
                        <Button onClick={signIn}>
                            Sign In
                        </Button>
                    </>)
            }
        </div>
    )
}
