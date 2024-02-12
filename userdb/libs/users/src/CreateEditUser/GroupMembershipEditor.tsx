import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"

import { ChoiceField, ChoiceFieldChoice } from "@react-workshop/fields"
import { Group } from "@react-workshop/userdb-api-client"
import { GroupTags, useGroupsDataService } from "@react-workshop/userdb-libs-groups"

export interface GroupMembershipEditorProps {
	groupIds: string[]
	setGroupIds: (newGroupIds: string[]) => unknown
}

export const GroupMembershipEditor = ({ groupIds, setGroupIds }: GroupMembershipEditorProps) => {
	const { queries } = useGroupsDataService()
	const { data: groups, isPending: isLoadingGroups } = useQuery(queries.all())
	const [groupToAdd, setGroupToAdd] = useState<ChoiceFieldChoice<Group>>()

	const groupChoices = useMemo(
		() =>
			groups?.map(
				(group): ChoiceFieldChoice<Group> => ({
					data: group,
					label: group.displayName,
					value: group.id
				})
			) ?? [],
		[groups]
	)

	const removeGroup = (groupId: string) => {
		setGroupIds(groupIds.filter((existingGroupId) => existingGroupId !== groupId))
	}
	const addGroup = () => {
		if (!groupToAdd) return
		const groupsSet = new Set(groupIds)
		groupsSet.add(groupToAdd.data.id)
		setGroupIds([...groupsSet])
	}

	return (
		<>
			<GroupTags groupIds={groupIds} onRemove={removeGroup} />
			<ChoiceField
				label="Groups"
				variant="select"
				value={groupToAdd}
				onChange={setGroupToAdd}
				options={groupChoices}
				disabled={isLoadingGroups}
			/>
			<button type="button" onClick={addGroup} disabled={!groupToAdd}>
				Add group
			</button>
		</>
	)
}
