import { useParams } from "react-router-dom"

import { StaticUsersList } from "@react-workshop/userdb-libs-users"

import { MainMenu } from "../MainMenu"

export const UsersPage = () => {
	const { userId } = useParams<"userId">()

	return (
		<>
			<MainMenu />
			<StaticUsersList highlightUserId={userId} />
		</>
	)
}
