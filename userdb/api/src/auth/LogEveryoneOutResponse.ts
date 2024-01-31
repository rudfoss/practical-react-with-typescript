import { ApiProperty } from "@nestjs/swagger"
import { ValidateNested } from "class-validator"

import { UserSession } from "../models"

export class LogEveryoneOutResponse {
	@ApiProperty({
		description: "Each session that was logged out",
		type: UserSession,
		isArray: true
	})
	@ValidateNested()
	removedSessions: UserSession[]
}
