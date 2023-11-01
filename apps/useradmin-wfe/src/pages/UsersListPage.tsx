import { useWindowTitle } from "@prwt/tasks"
import { UsersTableFromServer } from "@prwt/user-admin"

export const UsersListPage = () => {
	useWindowTitle("Users")
	return <UsersTableFromServer />
}
