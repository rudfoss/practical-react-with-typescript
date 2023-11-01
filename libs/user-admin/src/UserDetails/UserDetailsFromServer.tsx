import { useEffect, useState } from "react"

import { useUser } from "../data"
import { User } from "../users"

import { UserDetails } from "./UserDetails"

export interface UserDetailsFromServerProps {
	userId: string
}

export const UserDetailsFromServer = ({
	userId
}: UserDetailsFromServerProps) => {
	const [localUser, setLocalUser] = useState<User>()
	const { user, updateUser } = useUser(userId)

	useEffect(() => {
		setLocalUser(user.data)
	}, [user.data])

	const save = () => {
		if (!localUser) return
		updateUser.mutate(localUser)
	}

	if (!localUser || user.isLoading) {
		return <p>Loading...</p>
	}

	return (
		<>
			<UserDetails user={localUser} onChange={setLocalUser} />
			<button onClick={save}>Save</button>
		</>
	)
}
