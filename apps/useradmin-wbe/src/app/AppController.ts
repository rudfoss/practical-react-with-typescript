import { Controller, Get, Res } from "@nestjs/common"
import { ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger"
import { formatISODuration, intervalToDuration } from "date-fns"

import { UserAdminWBEReply } from "../RequestReply"

@Controller()
@ApiTags("UserAdmin-WBE")
export class AppController {
	private _bootTime = new Date()

	@Get()
	@ApiExcludeEndpoint()
	public redirectToDocs(@Res() reploy: UserAdminWBEReply) {
		reploy.status(302).redirect("/docs")
	}

	@Get("health")
	public getHealth() {
		return {
			ok: true,
			bootTime: this._bootTime,
			upTime: formatISODuration(intervalToDuration({ start: this._bootTime, end: new Date() }))
		}
	}
}
