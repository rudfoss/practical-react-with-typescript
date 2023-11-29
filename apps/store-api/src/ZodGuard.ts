import { ZodDtoStatic } from "@anatine/zod-nestjs"
import {
	CanActivate,
	ExecutionContext,
	HttpStatus,
	Injectable
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { ZodError, ZodSchema } from "zod"

import { StoreApiRequest } from "./RequestReply"
import { HttpProblemException } from "./exceptions"

export const ZodGuardQuery = Reflector.createDecorator<
	ZodSchema | ZodDtoStatic
>()
export const ZodGuardBody = Reflector.createDecorator<
	ZodSchema | ZodDtoStatic
>()

@Injectable()
export class ZodGuard implements CanActivate {
	public constructor(private reflector: Reflector) {}

	private _getSchemasFromDecorators(context: ExecutionContext) {
		const reflectorContexts = [context.getHandler(), context.getClass()]
		const querySchemaBase = this.reflector.getAllAndOverride(
			ZodGuardQuery,
			reflectorContexts
		)
		const querySchema =
			querySchemaBase instanceof ZodSchema
				? querySchemaBase
				: querySchemaBase?.zodSchema

		const bodySchemaBase = this.reflector.getAllAndOverride(
			ZodGuardBody,
			reflectorContexts
		)
		const bodySchema =
			bodySchemaBase instanceof ZodSchema
				? bodySchemaBase
				: bodySchemaBase?.zodSchema

		return { querySchema, bodySchema }
	}

	private _throwBadRequest(scope: "query" | "body", zodError: ZodError) {
		throw new HttpProblemException({
			status: HttpStatus.BAD_REQUEST,
			type: HttpProblemException.createType("BadRequest"),
			title: `Malformed request ${scope}`,
			errors: zodError.flatten()
		})
		return false // Needed to satisfy the typecheck gods
	}

	public canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<StoreApiRequest>()

		const { querySchema, bodySchema } = this._getSchemasFromDecorators(context)
		if (querySchema) {
			const queryParseResult = querySchema.safeParse(request.query)
			if (!queryParseResult.success) {
				return this._throwBadRequest("query", queryParseResult.error)
			}
			request.query = queryParseResult.data
		}
		if (bodySchema) {
			const bodyParseResult = bodySchema.safeParse(request.body)
			if (!bodyParseResult.success) {
				return this._throwBadRequest("body", bodyParseResult.error)
			}
			request.body = bodyParseResult.data
		}

		return true
	}
}
