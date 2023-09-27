import { Controller, Get, Inject, Res } from "@nestjs/common"
import { ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger"
import { formatISODuration, intervalToDuration } from "date-fns"

import { UserAdminWBEReply } from "../RequestReply"
import { StoreDiagnostics, StoreDiagnostics_Token } from "../store"

@Controller()
@ApiTags("WBE")
export class AppController {
	private _bootTime = new Date()

	public constructor(
		@Inject(StoreDiagnostics_Token) protected readonly storeDiagnostics: StoreDiagnostics
	) {}

	@Get()
	@ApiExcludeEndpoint()
	public redirectToDocs(@Res() reploy: UserAdminWBEReply) {
		reploy.status(302).redirect("/docs")
	}

	@Get("health")
	public async getHealth() {
		return {
			ok: true,
			bootTime: this._bootTime,
			upTime: formatISODuration(intervalToDuration({ start: this._bootTime, end: new Date() })),
			store: await this.storeDiagnostics.getStoreDiagnostics()
		}
	}
}
