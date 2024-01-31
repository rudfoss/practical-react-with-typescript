import { Reflector } from "@nestjs/core"
import { DECORATORS } from "@nestjs/swagger/dist/constants"

import { UserDbRole } from "../models"

/**
 * Ensure that user has at least one of the specified roles.
 */
export const RequireRolesDecorator = Reflector.createDecorator<UserDbRole[]>()

/**
 * Ensure that only users with one or more of the specified roles can access the endpoint. By default it also updates the OpenAPI description of the endpoint and adds the roles to the end.
 * @param roles
 * @returns
 */
export const RequireRoles =
	(
		roles: UserDbRole[],
		{ noUpdateOpenApiDescription }: { noUpdateOpenApiDescription: boolean } = {
			noUpdateOpenApiDescription: false
		}
	): MethodDecorator =>
	(target, propertyKey, descriptor) => {
		if (!noUpdateOpenApiDescription) {
			const existing: { description?: string } = Reflect.getMetadata(
				DECORATORS.API_OPERATION,
				descriptor.value!
			) ?? {
				description: ""
			}
			existing.description = `${existing.description ?? ""}\n\n**Roles**: ${roles.join(", ")}`
			Reflect.defineMetadata(DECORATORS.API_OPERATION, existing, descriptor.value!)
		}
		RequireRolesDecorator(roles)(target, propertyKey, descriptor)
	}
