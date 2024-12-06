import { useQuery } from "@tanstack/react-query"

import { LoadingSpinner } from "@practical-react/ui"

export const ApiHealthPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/health")
      if (!response.ok) {
        throw new Error("It was not ok")
      }
      return await response.json()
    }
  })

  return isLoading ? <LoadingSpinner /> : <p>Uptime: {data?.upTime}</p>
}
