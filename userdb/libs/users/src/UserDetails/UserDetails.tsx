import { User } from "@react-workshop/userdb-api-client"

export interface UserDetailsProps {
	user: User
}

export const UserDetails = ({ user }: UserDetailsProps) => {
	return <div>Details for {user.displayName ?? user.username}</div>
}
