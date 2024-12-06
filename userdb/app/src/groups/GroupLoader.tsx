import { useQuery } from "@tanstack/react-query"

import { LoadingSpinner } from "@practical-react/ui"
import { useApiClientsService } from "@practical-react/userdb-api-clients-react"

import { GroupDetailsView } from "./GroupDetailsView"

export interface GroupLoaderProps {
  groupId: string
}

export const GroupLoader = ({ groupId }: GroupLoaderProps) => {
  const { groupsClient } = useApiClientsService()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["groups", "byId", groupId],
    queryFn: () => groupsClient.current.getGroup(groupId)
  })

  if (isError) {
    return <p>Something went wrong</p>
  }

  if (!data || isLoading) {
    return <LoadingSpinner />
  }

  return <GroupDetailsView group={data} />
}
