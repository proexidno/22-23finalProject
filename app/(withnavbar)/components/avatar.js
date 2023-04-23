"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function Avatar() {
    const { data } = useSession()

    return (
        <div className="flex justify-center md:justify-end [&>*]:px-3s py-2 box-content">
            {
                data?.user ? <button className=" bg-blue-500 text-white px-5 font-light xl:text-4xl mx-2" onClick={() => signOut()}>
                    Sign Out
                </button> : <button className=" bg-blue-500 text-white px-5 font-light xl:text-4xl mx-2" onClick={() => signIn()}>
                    Sign In
                </button>
            }
        </div>
    )
}
