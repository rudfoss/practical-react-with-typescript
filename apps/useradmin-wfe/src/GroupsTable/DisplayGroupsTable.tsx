import { useGroups } from "@prt/data"

import { GroupsTable } from "./GroupsTable"

export const DisplayGroupsTable = () => {
	const { data: groups = [], isLoading } = useGroups()

	if (isLoading) {
		return <p>Loading...</p>
	}

	return <GroupsTable groups={groups} />
}
