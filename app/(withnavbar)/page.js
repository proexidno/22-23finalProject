"use client"
import Link from "next/link";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { Progress } from "components/ui/progress"

export default function Home() {

  const { data: session } = useSession()
  const user = session?.user;

  const [userLevel, setUserLevel] = useState(null)
  const [userpPogression, setUserpPogression] = useState(null)
  const [userpMaxPogression, setUserpMaxPogression] = useState(null)
  const [documentationTitle, setDocumentationTitle] = useState(null)
  const [documentationDescription, setDocumentationDescription] = useState(null)

  useEffect(() => {
    async function fetchUserData() {
      const userOfflineAndOnlineData = await fetch("http://localhost:3000/api/getuserglobaldata", {
        "method": 'POST',
        "body": JSON.stringify({ user_id: user?.id }),
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
      fetchUserData().then(e => {
        setUserLevel(e.level);
        setUserpPogression(e.progression);
        setUserpMaxPogression(e.max_progression);
        fetchDocumentation(e.level).then(elem => {
          const { title, description } = elem
          setDocumentationTitle(title);
          setDocumentationDescription(description);
        })
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
          <p>Play offline and upgrade your level and unlock new levels and signs.</p>
        </Link>
        <div className="games-provider p-9 bg-gray-400">
          <h1>Play daily</h1>
          <p>Play daily level and compete on speed with other players.</p>
        </div>
      </div>
      {userLevel !== null ?
        <div className="level-container border-4 rounded-xl border-gray-300 overflow-hidden mt-6 h-40 p-6">
          <h1>
            Your level is {userLevel}
          </h1>
          <p>
            Your progress is {userpPogression} out of {userpMaxPogression}
          </p>
          <Progress value={(userpPogression / userpMaxPogression).toFixed(2) * 100} className="w-1/3" />
        </div> :
        <></>
      }
      {documentationTitle ?
        <div className="level-container border-4 rounded-xl border-gray-300 overflow-hidden mb-8 mt-6 p-6">
          <h1>
            {documentationTitle}
          </h1>
          <p dangerouslySetInnerHTML={{ __html: documentationDescription.replaceAll("\n", "<br />") }} />
        </div> :
        <></>
      }
    </>
  )
}
