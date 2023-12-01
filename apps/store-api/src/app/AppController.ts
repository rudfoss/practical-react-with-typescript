import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"
import {
	Controller,
	Get,
	InternalServerErrorException,
	Res
} from "@nestjs/common"
import {
	ApiExcludeEndpoint,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger"
import { formatISODuration, intervalToDuration } from "date-fns"

import { StoreApiReply } from "../RequestReply"
import { HttpProblemResponse } from "../exceptions"

import { HealthData as HealthDataModel } from "./HealthData"

export class HealthData extends createZodDto(extendApi(HealthDataModel)) {}

@Controller()
@ApiTags("App")
export class AppController {
	private _bootTime = new Date()

	@Get()
	@ApiExcludeEndpoint()
	public redirectToDocs(@Res() reply: StoreApiReply) {
		reply.status(302).redirect("/docs")
	}

	@Get("health")
	@ApiOperation({
		summary: "Get health information about the API",
		description: "Provides some health information about the API."
	})
	@ApiOkResponse({
		description: HealthDataModel.description,
		type: HealthData
	})
	public async getHealth(): Promise<HealthData> {
		return {
			ok: true,
			bootTime: this._bootTime.toISOString(),
			upTime: formatISODuration(
				intervalToDuration({ start: this._bootTime, end: new Date() })
			)
		}
	}

	@Get("internalError")
	@ApiOperation({
		summary: "Return a 500 error for testing",
		description: "This endpoint immediately returns a 500 error for testing"
	})
	@ApiInternalServerErrorResponse({
		description: "An internal error formatted as a problem",
		type: HttpProblemResponse
	})
	public internalError() {
		throw new InternalServerErrorException("Testing error.")
	}

	@Get("____")
	@ApiExcludeEndpoint()
	public "🥚"() {
		return "❤️🐧"
	}
}
