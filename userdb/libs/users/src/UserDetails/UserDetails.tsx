import { User } from "@react-workshop/userdb-api-client"
import { GroupTags, RoleTags } from "@react-workshop/userdb-libs-groups"

export interface UserDetailsProps {
	user: User
}

export const UserDetails = ({ user }: UserDetailsProps) => {
	const { id, groupIds, username, displayName, pictureUrl } = user

	return (
		<dl>
			<dt>Id</dt>
			<dd>{id}</dd>
			<dt>Username</dt>
			<dd>{username}</dd>
			<dt>Display Name</dt>
			<dd>{displayName}</dd>
			{pictureUrl && (
				<>
					<dt>Picture</dt>
					<dd>
						<img src={pictureUrl} alt="Users profile" />
					</dd>
				</>
			)}
			<dt>Roles</dt>
			<dd>
				<RoleTags groupIds={groupIds} />
			</dd>
			<dt>Groups</dt>
			<dd>
				<GroupTags groupIds={groupIds} />
			</dd>
		</dl>
	)
}
