import { useParams } from "react-router-dom"

import { GroupLoader } from "../groups"

export const GroupDetailsPage = () => {
  const { groupId } = useParams<"groupId">()

  if (!groupId) {
    return <p>Missing parameter :groupId</p>
  }

  return <GroupLoader groupId={groupId} />
}
