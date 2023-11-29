import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
	UnauthorizedException
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"

import { StoreApiRequest } from "../RequestReply"

import { AuthService } from "./AuthService"
import { Role } from "./User"

export const RequireRoles = Reflector.createDecorator<Role[]>()

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(
		private reflector: Reflector,
		@Inject(AuthService) protected readonly authService: AuthService
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.getAllAndOverride(RequireRoles, [
			context.getHandler(),
			context.getClass()
		])
		const request = context.switchToHttp().getRequest<StoreApiRequest>()
		const [, sessionToken] = request.headers.authorization?.split(" ") ?? []
		if (!sessionToken) return false

		const { session, user } =
			this.authService.getUserSession(sessionToken) ?? {}
		if (!session || !user) return false

		if (roles && user.role !== "admin") {
			if (!roles.includes(user.role))
				throw new UnauthorizedException(
					`User does not have role: ${JSON.stringify(roles)}`
				)
		}

		request.user = user
		request.session = session

		return true
	}
}
