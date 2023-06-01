import { TextField } from "@prwt/fields"

import { User } from "../staticUsers"

import { ColumnNames } from "./userTableTypes"

export interface UsersTableRowProps {
	columnOrder: ColumnNames[]
	user: User
	onSave: (modifiedUser: User) => unknown
}

export const UsersTableRow = ({
	user,
	onSave,
	columnOrder
}: UsersTableRowProps) => {
	const saveFirstName = (newFirstName: string) => {
		onSave({
			...user,
			firstName: newFirstName
		})
	}

	return (
		<tr>
			{columnOrder.map((colName) => (
				<td key={colName}>
					{colName === "firstName" ? (
						<TextField
							label=""
							value={user[colName]}
							onChange={saveFirstName}
						/>
					) : (
						user[colName]
					)}
				</td>
			))}
		</tr>
	)
}
