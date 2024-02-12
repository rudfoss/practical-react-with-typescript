import { useQuery } from "@tanstack/react-query"

import { LoadingSpinner } from "@react-workshop/ui"
import { User } from "@react-workshop/userdb-api-client"

import { useDeleteUser, useUsersDataService } from "../usersDataService"

import { UsersTable } from "./UsersTable"

export interface UsersTableFromServerProps {
	createUserLink?: (user: User) => string
	canDelete?: boolean
}

export const UsersTableFromServer = ({ createUserLink, canDelete }: UsersTableFromServerProps) => {
	const { queries } = useUsersDataService()
	const { data: users } = useQuery(queries.all())
	const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser()

	const onDelete = (userToDelete: User) => {
		deleteUser(userToDelete.id)
	}

	if (users) {
		return (
			<UsersTable
				users={users}
				createUserLink={createUserLink}
				canDelete={!isDeleting && canDelete}
				onDelete={canDelete ? onDelete : undefined}
			/>
		)
	}

	return <LoadingSpinner />
}
