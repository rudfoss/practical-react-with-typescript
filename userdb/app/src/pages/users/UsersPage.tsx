import { useAuthService } from "@react-workshop/userdb-libs-auth"
import { UsersTableFromServer } from "@react-workshop/userdb-libs-users"

export const UsersPage = () => {
	const { roles } = useAuthService()
	const canDelete = roles?.includes("Admin") || roles?.includes("UserAdmin")
	return (
		<UsersTableFromServer canDelete={canDelete} createUserLink={(user) => `/users/${user.id}`} />
	)
}
