import { useQuery } from "@tanstack/react-query"

import { LoadingSpinner } from "@react-workshop/ui"

import { useUsersDataService } from "../usersDataService"

import { AvatarDisplay } from "./AvatarDisplay"

export interface AvatarProps {
	userId: string
}

export const Avatar = ({ userId }: AvatarProps) => {
	const { queries } = useUsersDataService()
	const { data: user } = useQuery(queries.byId(userId))

	return (
		<AvatarDisplay title={user ? user.displayName : userId}>
			{user ? user.displayName?.slice(0, 2) : <LoadingSpinner size={16} />}
		</AvatarDisplay>
	)
}
