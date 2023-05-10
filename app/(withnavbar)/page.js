"use client"

import { useSession } from "next-auth/react"

export default function Home() {
  
  const { data: session } = useSession()
  const user = session?.user;

  return (
    <>
      <div className="grid md:grid-rows-1 md:grid-cols-3 grid-rows-3 grid-cols-1 border-8 rounded-xl border-gray-300 overflow-hidden">
        <div className="games-provider p-9 bg-gray-400">
          <h1>Play Online</h1>
          <p>Play online versus another player. How will be the first one to complete the quality?</p>
        </div>
        <div className="games-provider p-9 bg-gray-500">
          <h1>Play offline</h1>
          <p></p>
        </div>
        <div className="games-provider p-9 bg-gray-400">
          <h1>Play daily</h1>
          <p></p>
        </div>
      </div>
      <div className="level-container border-4 rounded-xl border-gray-300 overflow-hidden mt-6 h-40 p-6">
        <h1>
          Your level is {user?.level}
        </h1>
        <p>
          Your progress is {user?.progression} out of {user?.max_progression}
        </p>
      </div>
    </>
  )
}
