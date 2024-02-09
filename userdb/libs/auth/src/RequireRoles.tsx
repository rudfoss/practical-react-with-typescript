import { ReactNode } from "react"

import { UserDatabaseRole } from "@react-workshop/userdb-api-client"

import { useAuthService } from "./authService"

export interface RequireRolesProps {
	/**
	 * Specify what to render if the user is not authenticated or does not have at least one of the provided roles.
	 */
	onMissingRoles?: ReactNode
	/**
	 * Specify any of the roles the user must have to render the children. If the user has any of these roles the children are rendered.
	 */
	roles?: UserDatabaseRole[]
	children: ReactNode
}

export const RequireRoles = ({ onMissingRoles, roles, children }: RequireRolesProps) => {
	const { roles: userRoles = [] } = useAuthService()

	// userRoles must have at least one role to exist so we use that as a test for authentication
	if (userRoles.length === 0) return onMissingRoles

	// We are now authenticated, if no roles are specified for the check then just render the children. Or if the user is an admin then they should see everything.
	if (userRoles.includes("Admin") || !roles) return children

	// User has at least one role and at least one role is required so now we check if the user has any of the required roles
	if (userRoles?.some((userRole) => roles?.includes(userRole))) return children

	// User does not have one of the required roles
	return onMissingRoles
}
