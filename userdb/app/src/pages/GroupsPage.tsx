import { useState } from "react"
import { useParams } from "react-router-dom"

import { staticGroups, StaticGroupTable } from "../groups"

export const GroupsPage = () => {
  const { groupId } = useParams<"groupId">()
  const [groups, setGroups] = useState(staticGroups)
  return (
    <StaticGroupTable
      groups={groups}
      setGroups={setGroups}
      highlightGroupId={groupId}
    />
  )
}
