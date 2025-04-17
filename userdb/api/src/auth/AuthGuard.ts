import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"

import { UserDatabaseApiRequest } from "../RequestReply"
import { UserDatabaseRole } from "../models"

import { AuthService } from "./AuthService"
import { RequireRolesDecorator } from "./RequireRolesDecorator"

/**
 * Prevents unauthenticated users from accessing an endpoint or controller. Applying this guard only guarantees that the user is authenticated. Use the `RequireRoles` decorator to limit by roles.
 */
@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(
		private reflector: Reflector,
		@Inject(AuthService) protected readonly authService: AuthService
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride(RequireRolesDecorator, [
			context.getHandler(),
			context.getClass()
		])
		const request = context.switchToHttp().getRequest<UserDatabaseApiRequest>()
		const [, sessionToken] = request.headers.authorization?.split(" ") ?? []
		if (!sessionToken) return false

		const session = await this.authService.getSession(sessionToken)
		if (!session) return false

		const userInformation = await this.authService.getUserInformation(session.userId)
		if (!userInformation) return false

		const { user, roles } = userInformation

		if (
			requiredRoles &&
			!roles.includes(UserDatabaseRole.Admin) &&
			!roles.some((userRole) => requiredRoles.includes(userRole))
		)
			throw new UnauthorizedException(
				`User id "${user.id}" does not have role any of the required roles ${JSON.stringify(requiredRoles)}`
			)

		request.userSession = session
		request.userInformation = userInformation

		return true
	}
}
