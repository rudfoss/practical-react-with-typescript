import { useParams } from "react-router-dom"

import { UserDetails } from "@prwt/user"
import { staticUsers } from "@prwt/user"

type UserDetailsPageParams = "userId"

export const UserDetailsPage = () => {
	const { userId } = useParams<UserDetailsPageParams>()

	if (!userId) {
		return <p>Missing userId parameter in url</p>
	}

	const user = staticUsers.find((user) => user.id === userId)

	if (!user) {
		return <p>No such user</p>
	}

	return <UserDetails user={user} />
}
