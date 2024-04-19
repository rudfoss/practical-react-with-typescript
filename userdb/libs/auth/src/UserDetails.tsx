import { useQuery } from "@tanstack/react-query"

import { LoadingSpinner } from "@react-workshop/ui"
import { useApiClientsService } from "@react-workshop/userdb-api-clients"

import { UserDetailsView } from "./UserDetailsView"

export interface UserDetailsProps {
	userId: string
}

export const UserDetails = ({ userId }: UserDetailsProps) => {
	const { usersClient } = useApiClientsService()
	const { data: user } = useQuery({
		queryKey: ["users", "byId", userId],
		queryFn: () => usersClient.current.getUser(userId)
	})

	if (user) {
		return <UserDetailsView user={user} />
	}

	return <LoadingSpinner />
}
