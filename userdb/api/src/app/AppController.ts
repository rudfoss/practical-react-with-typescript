import { Controller, Get, Inject, Res } from "@nestjs/common"
import { ApiExcludeEndpoint, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { formatISODuration, intervalToDuration } from "date-fns"

import { UserDatabaseApiReply } from "../RequestReply"
import {
	FileStorageServiceOptions,
	StorageService,
	StorageServiceKey,
	StorageServiceOptionsKey
} from "../storage"

import { HealthRespose } from "./HealthResponse"

@Controller()
@ApiTags("App")
export class AppController {
	private _bootTime = new Date()

	public constructor(
		@Inject(StorageServiceOptionsKey) private storageServiceOptions: FileStorageServiceOptions,
		@Inject(StorageServiceKey) private storageService: StorageService
	) {}

	@Get()
	@ApiExcludeEndpoint()
	public redirectToDocs(@Res() reply: UserDatabaseApiReply) {
		reply.status(302).redirect("/docs")
	}

	@Get("health")
	@ApiOperation({
		summary: "Get health information about the API",
		description: "Provides some health information about the API."
	})
	@ApiOkResponse({ type: HealthRespose })
	public async getHealth() {
		const userSessions = await this.storageService.getUserSessions()
		return new HealthRespose({
			ok: true,
			bootTime: this._bootTime.toISOString(),
			upTime: formatISODuration(intervalToDuration({ start: this._bootTime, end: new Date() })),
			dbFilePath: this.storageServiceOptions.fileName,
			sessionCount: userSessions.length
		})
	}

	@Get("____")
	@ApiExcludeEndpoint()
	public "🥚"() {
		return "❤️🐧"
	}
}
