import styled from "@emotion/styled"
import { useQueries } from "@tanstack/react-query"

import { useGroupsDataService } from "../groupsDataService"

import { RoleTag } from "./RoleTag"

const Container = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin: 0;
	padding: 0;
	list-style: none;
`

export interface RoleTagsProps {
	groupIds: string[]
	onlyDistinct?: boolean
}

export const RoleTags = ({ groupIds }: RoleTagsProps) => {
	const { queries } = useGroupsDataService()
	const groupResults = useQueries({
		queries: groupIds.map((groupId) => queries.byId(groupId))
	})

	const distinctRoles = new Set(groupResults.map((result) => result.data?.displayName ?? ""))
	distinctRoles.delete("")

	return (
		<Container>
			{[...distinctRoles].map((roleName) => (
				<li key={roleName}>
					<RoleTag roleName={roleName} />
				</li>
			))}
		</Container>
	)
}
