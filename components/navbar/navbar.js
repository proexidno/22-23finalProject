"use client"
import Link from "next/link";
import Logo from "./logo";
import { Avatar } from "./avatar";
import Documentation from "./documentation";


export default function Navbar() {
    return (
        <header
            className="grid fixed grid-rows-1 md:grid-cols-[30%_50%_20%] px-10 lg:px-12 xl:px-16 box-border py-1 w-full z-20">
            <Logo className="leading-loose" />
            <div className="flex justify-center gap-8 md:gap-4 lg:gap-8 leading-loose sm:text-3xl md:text-xl font-semibold lg:text-3xl xl:text-4xl">
                <Link className="hover:bg-slate-200 hover:rounded-3xl px-4 leading-loose" href="/">Home</Link>
                <Documentation />
                <Link className="hover:bg-slate-200 hover:rounded-3xl px-4 leading-loose" href="/games" >Games</Link>
            </div>
            <Avatar />
        </header>
    )
}