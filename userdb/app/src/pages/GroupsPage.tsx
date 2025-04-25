import { useParams } from "react-router-dom"
import { GroupsTable, staticGroups } from "../groups"

export const GroupsPage = () => {
	const { id } = useParams<"id">()
	return <GroupsTable groups={staticGroups} highlightGroupId={id} />
}
