"use client"
import Link from "next/link";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function Home() {

  const { data: session } = useSession()
  const user = session?.user;

  const [userLevel, setUserLevel] = useState(null)
  const [userpPogression, setUserpPogression] = useState(null)
  const [userpMaxPogression, setUserpMaxPogression] = useState(null)

  useEffect(() => {
    async function fetchUserData() {
      const userOfflineAndOnlineData = await fetch("http://localhost:3000/api/getuserglobaldata", {
        "method": 'POST',
        "body": JSON.stringify({ user_id: user?.id }),
        "next": { revalidate: 300 }
      })
      return await userOfflineAndOnlineData.json()
    }
    
    if (user) {
      fetchUserData().then(e => {
        setUserLevel(e.level)
        setUserpPogression(e.progression)
        setUserpMaxPogression(e.max_progression)
      })
    }


  }, [user])

  return (
    <>
      <div className="grid md:grid-rows-1 md:grid-cols-3 grid-rows-3 grid-cols-1 border-8 rounded-xl border-gray-300 overflow-hidden">
        <div className="games-provider p-9 bg-gray-400">
          <h1>Play Online</h1>
          <p>Play online versus another player. How will be the first one to complete the quality?</p>
        </div>
        <Link className="games-provider p-9 bg-gray-500" href="/games/offline">
          <h1>Play offline</h1>
          <p></p>
        </Link>
        <div className="games-provider p-9 bg-gray-400">
          <h1>Play daily</h1>
          <p></p>
        </div>
      </div>
      <div className="level-container border-4 rounded-xl border-gray-300 overflow-hidden mt-6 h-40 p-6">
        <h1>
          Your level is { userLevel }
        </h1>
        <p>
          Your progress is { userpPogression } out of { userpMaxPogression }
        </p>
      </div>
    </>
  )
}
