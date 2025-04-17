import { Controller, Get, Inject, Res } from "@nestjs/common"
import { ApiExcludeEndpoint, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { formatISODuration, formatRFC3339, intervalToDuration } from "date-fns"

import { UserDatabaseApiReply } from "../RequestReply"

import { UserDatabaseRole } from "../models"
import { FileStorageServiceOptions, StorageService, StorageServiceKey, StorageServiceOptionsKey } from "../storage"
import { HealthResponse } from "./HealthResponse"
import { StatsResponse } from "./StatsResponse"

@Controller()
@ApiTags("App")
export class AppController {
	private _bootTime = new Date()

	public constructor(
		@Inject(StorageServiceOptionsKey)
		private storageServiceOptions: FileStorageServiceOptions,
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
	@ApiOkResponse({ type: HealthResponse })
	public async getHealth() {
		return new HealthResponse({
			ok: true,
			bootTime: formatRFC3339(this._bootTime),
			upTime: formatISODuration(intervalToDuration({ start: this._bootTime, end: new Date() })),
			dbFilePath: this.storageServiceOptions.fileName
		})
	}

	@Get("stats")
	@ApiOperation({
		summary: "Returns some basic stats from the API"
	})
	@ApiOkResponse({ type: StatsResponse })
	public async getStats() {
		const userSessions = await this.storageService.getUserSessions()
		const users = await this.storageService.getUsers()
		const groups = await this.storageService.getGroups()

		const adminGroupIds = new Set(
			groups.filter((group) => group.roles.includes(UserDatabaseRole.Admin)).map((group) => group.id)
		)
		const guestGroupIds = new Set(
			groups.filter((group) => group.roles.includes(UserDatabaseRole.Guest)).map((group) => group.id)
		)

		const adminUsers = users.filter((user) => user.groupIds?.some((groupId) => adminGroupIds.has(groupId)))
		const guestUsers = users.filter((user) => user.groupIds?.some((groupId) => guestGroupIds.has(groupId)))

		return new StatsResponse({
			userCount: users.length,
			groupCount: groups.length,
			sessionCount: userSessions.length,

			adminCount: adminUsers.length,
			guestCount: guestUsers.length
		})
	}

	@Get("____")
	@ApiExcludeEndpoint()
	public "🥚"() {
		return "❤️🐧"
	}
}
