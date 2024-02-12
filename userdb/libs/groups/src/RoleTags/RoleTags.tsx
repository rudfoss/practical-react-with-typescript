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

export const RoleTags = ({ groupIds, onlyDistinct }: RoleTagsProps) => {
	const { queries } = useGroupsDataService()
	const groupResults = useQueries({
		queries: groupIds.map((groupId) => queries.byId(groupId))
	})

	const allRoles = groupResults
		.flatMap((result) => result.data?.roles ?? [""])
		.filter((role) => role !== "")
	const roles = onlyDistinct ? [...new Set(allRoles)] : allRoles

	return (
		<Container>
			{roles.map((roleName) => (
				<li key={roleName}>
					<RoleTag roleName={roleName} />
				</li>
			))}
		</Container>
	)
}
