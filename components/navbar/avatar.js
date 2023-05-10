"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "components/ui/button"
import { Router } from "lucide-react";

export function Avatar() {
    const { data } = useSession()
    return (
        <div className="flex justify-center md:justify-end [&>*]:px-3s py-2 box-content">
            {
                data?.user ? <Button>
                    <a href="http://localhost:3000/api/auth/signout">Sign Out</a>
                </Button> : <Button onClick={signIn}>
                    Sign In
                </Button>
            }
        </div>
    )
}
