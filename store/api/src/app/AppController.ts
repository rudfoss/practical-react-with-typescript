import { Controller, Get, Res } from "@nestjs/common"
import { ApiExcludeEndpoint, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { formatISODuration, intervalToDuration } from "date-fns"

import { merge } from "@react-workshop/utils"

import { StoreApiReply } from "../RequestReply"

import { HealthRespose } from "./HealthResponse"

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
	@ApiOkResponse({ type: HealthRespose })
	public async getHealth() {
		return merge(new HealthRespose(), {
			ok: true,
			bootTime: this._bootTime.toISOString(),
			upTime: formatISODuration(intervalToDuration({ start: this._bootTime, end: new Date() }))
		})
	}

	@Get("____")
	@ApiExcludeEndpoint()
	public "🥚"() {
		return "❤️🐧"
	}
}
