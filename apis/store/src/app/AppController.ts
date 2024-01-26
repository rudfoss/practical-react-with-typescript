import { Controller, Get, Res } from "@nestjs/common"
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from "@nestjs/swagger"
import { formatISODuration, intervalToDuration } from "date-fns"

import { StoreApiReply } from "../RequestReply"

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
	public async getHealth() {
		return {
			ok: true,
			bootTime: this._bootTime.toISOString(),
			upTime: formatISODuration(intervalToDuration({ start: this._bootTime, end: new Date() }))
		}
	}

	@Get("____")
	@ApiExcludeEndpoint()
	public "🥚"() {
		return "❤️🐧"
	}
}
