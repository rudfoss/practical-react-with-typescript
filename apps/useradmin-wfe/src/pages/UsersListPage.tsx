import { useWindowTitle } from "@prwt/tasks"
import { UsersTableFromConstants } from "@prwt/user-admin"

export const UsersListPage = () => {
	useWindowTitle("Users")
	return <UsersTableFromConstants />
}
