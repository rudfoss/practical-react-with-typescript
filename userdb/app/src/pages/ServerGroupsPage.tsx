import { useEffect } from "react"

import { Group } from "@practical-react/userdb-api-clients-react"

import { GroupsLoader } from "../groups/GroupsLoader"
import { useHeaderService } from "../headerService"

const createGroupLink = (group: Group) => `/groups/${group.id}`

export const ServerGroupsPage = () => {
  const { setHeader } = useHeaderService()
  useEffect(() => {
    setHeader("Groups")
  }, [setHeader])

  return <GroupsLoader createGroupLink={createGroupLink} />
}
