import { useParams } from "react-router-dom"

export const UserDetailsPage = () => {
	const { userId } = useParams<"userId">()

	return <h1>Details for user {userId}</h1>
}
