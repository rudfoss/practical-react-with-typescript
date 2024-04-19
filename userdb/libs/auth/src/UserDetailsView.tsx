import { useQueries } from "@tanstack/react-query"

import { User, useApiClientsService } from "@react-workshop/userdb-api-clients"

import { GroupName } from "./GroupName"

export interface UserDetailsViewProps {
	user: User
}

export const UserDetailsView = ({ user }: UserDetailsViewProps) => {
	const { id, displayName, username, groupIds } = user
	const { groupsClient } = useApiClientsService()
	const roles = useQueries({
		queries: groupIds.map((groupId) => ({
			queryKey: ["groups", "byId", groupId],
			queryFn: () => groupsClient.current.getGroup(groupId)
		})),
		combine: (results) => {
			const roles = new Set<string>()
			for (const aResult of results) {
				const groupRoles = aResult.data?.roles
				if (!groupRoles) continue

				for (const aGroupRole of groupRoles) {
					roles.add(aGroupRole)
				}
			}
			return roles
		}
	})

	return (
		<dl>
			<dt>Id</dt>
			<dd>{id}</dd>
			<dt>Display Name</dt>
			<dd>{displayName}</dd>
			<dt>User name</dt>
			<dd>{username}</dd>
			<dt>Groups</dt>
			<dd>
				{groupIds.map((groupId) => (
					<GroupName key={groupId} groupId={groupId} />
				))}
			</dd>
			<dt>Roles</dt>
			<dd>{[...roles].join(", ")}</dd>
		</dl>
	)
}
