import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { GroupDTO, IGroupDTO } from "@prwt/useradmin-wbe-client"

import { useUserApiService } from "../userApiService"

import { GroupDetails } from "./GroupDetails"

export interface GroupDetailsServerProps {
	groupId: string
}

export const GroupDetailsServer = ({ groupId }: GroupDetailsServerProps) => {
	const { groupsClient } = useUserApiService()
	const queryClient = useQueryClient()
	const { data: group, isLoading } = useQuery({
		queryKey: ["groups", "byId", groupId],
		queryFn: () => groupsClient.getGroup(groupId)
	})

	const { mutate: saveGroup } = useMutation({
		mutationFn: (updatedGroup: IGroupDTO) =>
			groupsClient.updateGroup(new GroupDTO(updatedGroup)),
		onSuccess: () => {
			queryClient.invalidateQueries(["groups"])
		}
	})

	if (isLoading) {
		return <p>Loading group {groupId}...</p>
	}

	if (!group) {
		return <p>No such group {groupId}</p>
	}

	return <GroupDetails group={group} onSave={saveGroup} />
}
