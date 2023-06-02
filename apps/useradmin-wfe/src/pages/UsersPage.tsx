import { UsersTableServerSide } from "@prwt/user"
import { useWindowTitle } from "@prwt/utils"

export const UsersPage = () => {
	useWindowTitle("Users")
	return <UsersTableServerSide />
}
