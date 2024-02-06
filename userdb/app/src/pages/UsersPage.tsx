import { Link, useSearchParams } from "react-router-dom"

import { StaticUsersList } from "@react-workshop/userdb-libs-users"

export const UsersPage = () => {
	const [searchParameters] = useSearchParams()

	return (
		<>
			<Link to="/">Home</Link>
			<StaticUsersList highlightUserId={searchParameters.get("userId") ?? undefined} />
		</>
	)
}
