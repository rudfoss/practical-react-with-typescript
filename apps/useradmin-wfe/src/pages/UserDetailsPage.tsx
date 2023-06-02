import { useParams } from "react-router-dom"

import { UserDetailsServer } from "@prwt/user"

type UserDetailsPageParams = "userId"

export const UserDetailsPage = () => {
	const { userId } = useParams<UserDetailsPageParams>()

	if (!userId) {
		return <p>Missing userId parameter in url</p>
	}

	return <UserDetailsServer userId={userId} />
}
