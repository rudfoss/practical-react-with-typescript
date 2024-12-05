import { useState } from "react"

import {
  ListGroups,
  StaticGroup,
  staticGroups,
  StaticGroupTable
} from "./groups"

export const App = () => {
  const [groups, setGroups] = useState<StaticGroup[]>(staticGroups)
  return (
    <>
      <ListGroups groups={groups} />
      <StaticGroupTable groups={groups} setGroups={setGroups} />
      <table className="groupsTable">
        <thead>
          <tr>
            <th>My table</th>
          </tr>
        </thead>
      </table>
    </>
  )
}
