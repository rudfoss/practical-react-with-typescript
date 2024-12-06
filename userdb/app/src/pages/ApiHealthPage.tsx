import { useQuery } from "@tanstack/react-query"

import { LoadingSpinner } from "@practical-react/ui"
import { useApiClientsService } from "@practical-react/userdb-api-clients-react"

export const ApiHealthPage = () => {
  const { appClient } = useApiClientsService()
  const { data, isLoading } = useQuery({
    queryKey: ["health"],
    queryFn: () => appClient.current.getHealth()
  })

  return isLoading ? <LoadingSpinner /> : <p>Uptime: {data?.upTime}</p>
}
