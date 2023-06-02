import { Link } from "react-router-dom"

import { IUserDTO } from "@prwt/useradmin-wbe-client"

import { useUserNavService } from "../userNavService"

import { ColumnNames } from "./userTableTypes"

export interface UsersTableRowProps {
	columnOrder: ColumnNames[]
	user: IUserDTO
}

export const UsersTableRow = ({ user, columnOrder }: UsersTableRowProps) => {
	const { createUserDetailsPath } = useUserNavService()

	return (
		<tr>
			<td>
				<Link to={createUserDetailsPath(user.id)}>View</Link>
			</td>

			{columnOrder.map((colName) => (
				<td key={colName}>{user[colName]}</td>
			))}
		</tr>
	)
}
