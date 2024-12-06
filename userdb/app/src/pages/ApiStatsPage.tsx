import { useQuery } from "@tanstack/react-query"

import { LoadingSpinner } from "@practical-react/ui"

export const ApiStatsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/stats")
      if (!response.ok) {
        throw new Error("It was not ok")
      }
      return await response.json()
    }
  })

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <p>Number of users: {data?.userCount}</p>
  )
}
