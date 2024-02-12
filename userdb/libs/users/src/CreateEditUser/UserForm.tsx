import { FormEvent, useEffect, useState } from "react"
import { OmitIndexSignature } from "type-fest"

import { TextField } from "@react-workshop/fields"
import { PatchUser, User } from "@react-workshop/userdb-api-client"

import { GroupMembershipEditor } from "./GroupMembershipEditor"

type UserKnownProperties = OmitIndexSignature<User>
type UserKnownKeys = keyof UserKnownProperties

export interface UserFormProps {
	disabled?: boolean
	initialData?: Partial<User>
	canEditPassword?: boolean

	onSave: (newUser: PatchUser) => unknown
}

export const UserForm = ({ disabled, initialData, onSave }: UserFormProps) => {
	const [user, setUser] = useState<PatchUser>(initialData ?? {})
	const isEdited = user !== initialData

	useEffect(() => {
		if (initialData) {
			setUser(initialData)
		}
	}, [initialData])

	const setter =
		<TKey extends UserKnownKeys>(key: TKey) =>
		(newValue: UserKnownProperties[TKey]) => {
			setUser({
				...user,
				[key]: newValue
			})
		}

	const onSubmit = (event: FormEvent) => {
		event.preventDefault()
		if (disabled) return
		onSave(user)
	}
	const reset = () => {
		setUser(initialData ?? {})
	}

	return (
		<form onSubmit={onSubmit}>
			<div>
				<strong>{user.id ?? "new user"}</strong>
			</div>
			<TextField label="User name" value={user.username ?? ""} onChange={setter("username")} />
			<TextField
				label="Display name"
				value={user.displayName ?? ""}
				onChange={setter("displayName")}
			/>
			<TextField
				label="Picture URL"
				value={user.pictureUrl ?? ""}
				onChange={setter("pictureUrl")}
			/>
			<fieldset>
				<legend>Groups</legend>
				<GroupMembershipEditor groupIds={user.groupIds ?? []} setGroupIds={setter("groupIds")} />
			</fieldset>
			<hr />
			<button disabled={!isEdited}>Save</button>
			<button type="reset" onClick={reset}>
				Reset
			</button>
		</form>
	)
}
