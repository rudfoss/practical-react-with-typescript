import { useState } from "react"

import { ListGroups } from "./ListGroups"
import { StaticGroupTable } from "./StaticGroupTable"
import { StaticGroup, staticGroups } from "./staticGroups"

export const App = () => {
  const [groups, setGroups] = useState<StaticGroup[]>(staticGroups)
  return (
    <>
      <ListGroups groups={groups} />
      <StaticGroupTable groups={groups} setGroups={setGroups} />
    </>
  )
}
