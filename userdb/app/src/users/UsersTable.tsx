import { StaticUser } from "./staticUsers"

export interface UsersTableProps {
	users: StaticUser[]
	onDelete?: (userId: string) => unknown
}

export const UsersTable = ({ users, onDelete }: UsersTableProps) => {
	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Display Name</th>
					{onDelete && <th>Controls</th>}
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<tr key={user.id}>
						<td>{user.id}</td>
						<td>{user.displayName}</td>
						{onDelete && (
							<td>
								<button type="button" onClick={() => onDelete(user.id)}>
									🗑️
								</button>
							</td>
						)}
					</tr>
				))}
			</tbody>
		</table>
	)
}
