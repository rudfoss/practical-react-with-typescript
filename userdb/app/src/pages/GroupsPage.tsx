import { useHeader } from "@prwt/libs-ui"
import { useParams } from "react-router-dom"
import { GroupsTable, staticGroups } from "../groups"

export const GroupsPage = () => {
	const { id } = useParams<"id">()
	useHeader(id ? `Group: ${id}` : "Groups")
	return <GroupsTable groups={staticGroups} highlightGroupId={id} />
}
