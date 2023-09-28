import { useState } from "react"

import { ListGroups, groups as initialGroups } from "@prwt/tasks"

export const App = () => {
	const [groups, setGroups] = useState(initialGroups)
	return <ListGroups groups={groups} onChange={setGroups} />
}
