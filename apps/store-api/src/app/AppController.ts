import { Controller, Get, Res } from "@nestjs/common"
import {
	ApiExcludeEndpoint,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger"
import { StoreApiReply } from "../RequestReply"
import { formatISODuration, intervalToDuration } from "date-fns"
import { HealthData as HealthDataModel } from "./HealthData"
import { createZodDto } from "@anatine/zod-nestjs"
import { extendApi } from "@anatine/zod-openapi"

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
}
