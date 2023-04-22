"use client"

import { useSession } from "next-auth/react"

export default function Home() {
  return (
    <main>
      <div className="grid grid-rows-1 grid-cols-3 mx-12">
        <div className=""><h1>Play Online</h1></div>
        <div className=""><h1>Play offline</h1></div>
        <div className=""><h1>Play daily</h1></div>
      </div>
    </main>
  )
}
