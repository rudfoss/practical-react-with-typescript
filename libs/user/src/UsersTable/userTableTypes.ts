import { User } from "../staticUsers"

export type ColumnNames = keyof Pick<
	User,
	"firstName" | "lastName" | "userName" | "email"
>
