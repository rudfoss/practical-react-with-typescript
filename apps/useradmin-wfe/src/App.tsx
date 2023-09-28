import { useState } from "react"

import {
	UserDetails,
	user as initialUser,
	GroupDetails,
	group as initialGroup
} from "@prwt/tasks"

export const App = () => {
	const [user, setUser] = useState(initialUser)
	const [group, setGroup] = useState(initialGroup)

	return (
		<>
			<GroupDetails initialGroup={group} onChange={setGroup} />
			<UserDetails user={user} onChange={setUser} />
		</>
	)
}
