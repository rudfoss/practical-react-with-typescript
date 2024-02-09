import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import { LoadingSpinner, useHeading } from "@react-workshop/ui"
import { UserDetails, useUsersDataService } from "@react-workshop/userdb-libs-users"

export const UserDetailsPage = () => {
	const { userId } = useParams<"userId">()
	const { queries } = useUsersDataService()
	const { data: user } = useQuery({ ...queries.byId(userId ?? ""), enabled: !!userId })
	useHeading(user ? `User details for ${user.displayName ?? user.username}` : "User details")

	if (user) {
		return <UserDetails user={user} />
	}

	return <LoadingSpinner />
}
