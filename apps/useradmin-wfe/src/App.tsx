import { useState } from "react"

import { UserDetails, user as initialUser } from "@prwt/tasks"

export const App = () => {
	const [user, setUser] = useState(initialUser)
	return <UserDetails user={user} onChange={setUser} />
}
