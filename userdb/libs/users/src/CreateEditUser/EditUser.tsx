import { useQuery } from "@tanstack/react-query"

import { LoadingSpinner } from "@react-workshop/ui"

import { useUpdateUser, useUsersDataService } from "../usersDataService"

import { UserForm } from "./UserForm"

export interface EditUserProps {
	userId: string
}

export const EditUser = ({ userId }: EditUserProps) => {
	const { queries } = useUsersDataService()
	const { data: user } = useQuery(queries.byId(userId))
	const { mutate: saveUser } = useUpdateUser()

	if (user) {
		return (
			<UserForm
				initialData={user}
				onSave={(nextUser) => saveUser({ userId: nextUser.id, patchUser: nextUser })}
			/>
		)
	}

	return <LoadingSpinner />
}
