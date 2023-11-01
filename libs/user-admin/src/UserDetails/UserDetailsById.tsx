import { useMemo } from "react"

import { users } from "../users"

import { UserDetails } from "./UserDetails"

export interface UserDetailsByIdProps {
	userId?: string
}

export const UserDetailsById = ({ userId }: UserDetailsByIdProps) => {
	const user = useMemo(() => {
		return users.find((aUser) => aUser.id === userId)
	}, [userId])

	if (!user) {
		return <p>No such user</p>
	}

	return <UserDetails user={user} onChange={() => 0} />
}
