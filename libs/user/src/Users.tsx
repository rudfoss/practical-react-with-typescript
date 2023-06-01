import { useState } from "react"

import { UserDetails } from "./UserDetails"
import { User, staticUser } from "./staticUser"

export const Users = () => {
	const [user, setUser] = useState<User>(staticUser)

	return (
		<>
			<UserDetails user={user} onSave={setUser} />
			<hr />
			<UserDetails user={user} onSave={setUser} />
			<hr />
			<UserDetails user={user} onSave={setUser} />
			<hr />
			<UserDetails user={user} onSave={setUser} />
			<hr />
			<UserDetails user={user} onSave={setUser} />
			<hr />
			<UserDetails user={user} onSave={setUser} />
		</>
	)
}
