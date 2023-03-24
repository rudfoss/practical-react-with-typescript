import { useParams } from "react-router-dom"

import { useUser } from "@prt/data"

export const UserDetailsPage = () => {
	const { id } = useParams()
	const { data: user } = useUser(id ?? "")

	return (
		<div>
			<p>Lookup user with id: {id}</p>
			<p>User name: {user?.userName}</p>
			<p>Id: {user?.id}</p>
		</div>
	)
}
