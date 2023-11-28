import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable
} from "@nestjs/common"
import { AuthService } from "./AuthService"
import { StoreApiRequest } from "../RequestReply"
import { Reflector } from "@nestjs/core"
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
			if (!roles.includes(user.role)) return false
		}

		request.user = user
		request.session = session

		return true
	}
}
