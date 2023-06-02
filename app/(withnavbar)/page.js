"use client"
import Link from "next/link";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { Progress } from "components/ui/progress"

export default function Home() {

  const { data: session } = useSession()
  const user = session?.user;

  const [globalData, setGlobalData] = useState(null)

  useEffect(() => {
    async function fetchGlobalData() {
      const userOfflineAndOnlineData = await fetch("http://localhost:3000/api/getglobaldata", {
        "method": 'POST',
        "body": JSON.stringify({ user_id: user?.id, user: true, docs: true }),
        "next": { revalidate: 300 }
      })
      return await userOfflineAndOnlineData.json()
    }

    async function fetchDocumentation(level) {
      const userOfflineAndOnlineData = await fetch("http://localhost:3000/api/getdocumentation", {
        "method": 'POST',
        "body": JSON.stringify({ level }),
        "next": { revalidate: 604800 }
      })
      const res = await userOfflineAndOnlineData.json()

      return res.docs
    }

    if (user) {
      fetchGlobalData().then(setGlobalData)
    }


  }, [user])

  return (

    <main className='pt-48 md:pt-20 lg:pt-24 lg:w-256 mx-auto'>
      <div className="grid md:grid-flow-col grid-rows-1 border-8 rounded-xl border-gray-300 overflow-hidden md:grid-rows-1">
        <div className="games-provider p-9 bg-gray-400 hidden">
          <h1>Play Online</h1>
          <p>Play online versus another player. How will be the first one to complete the quality?</p>
        </div>
        <Link className="games-provider p-9 bg-gray-500" href="/games/offline">
          <h1>Play offline</h1>
          <p>Play offline and upgrade your level and unlock new levels and signs.</p>
        </Link>
        <div className="games-provider p-9 bg-gray-400 hidden">
          <h1>Play daily</h1>
          <p>Play daily level and compete on speed with other players.</p>
        </div>
      </div>
      {globalData !== null ?
        <div className="level-container border-4 rounded-xl border-gray-300 overflow-hidden mt-6 h-40 p-6">
          <h1>
            Your level is {globalData.level}
          </h1>
          <p>
            Your progress is {globalData.progression} out of {globalData.level >= 13 ? "infinity" : globalData.max_progression}
          </p>
          <Progress value={globalData.level >= 13 ? 100 : (globalData.progression / globalData.max_progression).toFixed(2) * 100} className="w-1/2 caret-gray-200 border border-slate-300" />

          <p> You played total of {globalData.total_games} games</p>
        </div> :
        <></>
      }
      {globalData !== null && globalData.title ?
        <div className="level-container border-4 rounded-xl border-gray-300 overflow-hidden mb-8 mt-6 p-6">
          <h1>
            {globalData.title}
          </h1>
          <p dangerouslySetInnerHTML={{ __html: globalData.description.replaceAll("\n", "<br />") }} />
        </div> :
        <></>
      }
    </main>
  )
}
