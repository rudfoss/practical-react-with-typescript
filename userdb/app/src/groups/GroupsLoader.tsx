import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { LoadingSpinner } from "@practical-react/ui"
import { useApiClientsService } from "@practical-react/userdb-api-clients-react"

import { GroupsTable, GroupsTableProps } from "./GroupsTable"

export type GroupsLoaderProps = Pick<GroupsTableProps, "createGroupLink">

export const GroupsLoader = (props: GroupsLoaderProps) => {
  const queryClient = useQueryClient()
  const { groupsClient } = useApiClientsService()
  const {
    data: groups,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["groups", "all"],
    queryFn: () => groupsClient.current.getGroups()
  })

  const {
    mutate: deleteGroup,
    isError: isDeleteError,
    isPending: isDeletePending
  } = useMutation({
    mutationFn: (groupId: string) => groupsClient.current.deleteGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups"]
      })
    }
  })

  if (isError || isDeleteError) {
    return <p>Something went wrong loading groups</p>
  }

  if (isLoading || isDeletePending || !groups) {
    return <LoadingSpinner />
  }

  return <GroupsTable groups={groups} deleteGroup={deleteGroup} {...props} />
}
