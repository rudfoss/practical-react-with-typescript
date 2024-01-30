import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
	UnauthorizedException
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"

import { UserDbApiRequest } from "../RequestReply"
import { UserDbRole } from "../models"

import { AuthService } from "./AuthService"

/**
 * Ensure that user has at least one of the specified roles.
 */
export const RequireRoles = Reflector.createDecorator<UserDbRole[]>()

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
		const requiredRoles = this.reflector.getAllAndOverride(RequireRoles, [
			context.getHandler(),
			context.getClass()
		])
		const request = context.switchToHttp().getRequest<UserDbApiRequest>()
		const [, sessionToken] = request.headers.authorization?.split(" ") ?? []
		if (!sessionToken) return false

		const {
			session,
			user,
			roles = []
		} = await this.authService.getSessionUserAndRoles(sessionToken)
		if (!session || !user) return false

		if (requiredRoles && !roles.includes(UserDbRole.Admin)) {
			if (!roles.some((userRole) => requiredRoles.includes(userRole)))
				throw new UnauthorizedException(
					`User id "${user.id}" does not have role any of the required roles ${JSON.stringify(
						requiredRoles
					)}`
				)
		}

		request.userSession = session
		request.user = user
		request.roles = roles

		return true
	}
}
