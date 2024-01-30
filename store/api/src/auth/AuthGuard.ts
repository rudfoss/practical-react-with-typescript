import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
	UnauthorizedException
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"

import { StoreApiRequest } from "../RequestReply"
import { UserRole } from "../models"

import { AuthService } from "./AuthService"

export const RequireRoles = Reflector.createDecorator<UserRole[]>()

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
		const request = context.switchToHttp().getRequest<StoreApiRequest>()
		const [, sessionToken] = request.headers.authorization?.split(" ") ?? []
		if (!sessionToken) return false

		const { userSession, user } = await this.authService.getUserSessionAndUser(sessionToken)
		if (!userSession || !user) return false

		if (requiredRoles && !user.roles.includes(UserRole.Admin)) {
			if (!user.roles.some((userRole) => requiredRoles.includes(userRole)))
				throw new UnauthorizedException(
					`User id "${user.id}" does not have role any of the required roles ${JSON.stringify(
						requiredRoles
					)}`
				)
		}

		request.userSession = userSession
		request.user = user

		return true
	}
}
