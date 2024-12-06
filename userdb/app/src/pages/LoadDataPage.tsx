import { useState } from "react"

import { LoadingSpinner } from "@practical-react/ui"

interface Stats {
  userCount: number
}

export const LoadDataPage = () => {
  const [stats, setStats] = useState<Stats>()
  const [isLoading, setIsLoading] = useState(false)

  const fetchStats = async () => {
    setIsLoading(true)
    const response = await fetch("http://localhost:4000/stats")
    if (!response.ok) {
      alert(`Something broke: ${response.status}: ${response.statusText}`)
      setIsLoading(false)
      return
    }
    const statsResult = await response.json()
    setIsLoading(false)
    setStats(statsResult)
  }

  return (
    <>
      <p>
        <button onClick={() => fetchStats()} disabled={isLoading}>
          Load stats
        </button>
      </p>
      {isLoading ? <LoadingSpinner /> : <p>User count: {stats?.userCount}</p>}
    </>
  )
}
