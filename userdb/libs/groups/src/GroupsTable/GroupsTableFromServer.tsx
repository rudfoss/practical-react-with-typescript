import { useQuery } from "@tanstack/react-query"

import { LoadingSpinner } from "@react-workshop/ui"
import { Group } from "@react-workshop/userdb-api-client"

import { useDeleteGroup, useGroupsDataService } from "../groupsDataService"

import { GroupsTable } from "./GroupsTable"

export interface GroupsTableFromServerProps {
	canDelete?: boolean
}

export const GroupsTableFromServer = ({ canDelete }: GroupsTableFromServerProps) => {
	const { queries } = useGroupsDataService()
	const { data: groups } = useQuery(queries.all())
	const { mutate: deleteGroup, isPending: isDeleting } = useDeleteGroup()

	const onDelete = (groupToDelete: Group) => {
		deleteGroup(groupToDelete.id)
	}

	if (groups) {
		return (
			<GroupsTable
				groups={groups}
				canDelete={!isDeleting && canDelete}
				onDelete={canDelete ? onDelete : undefined}
			/>
		)
	}

	return <LoadingSpinner />
}
