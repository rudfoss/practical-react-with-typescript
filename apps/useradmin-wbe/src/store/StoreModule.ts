import { Module } from "@nestjs/common"

import { GroupStore_Token } from "./GroupStore"
import { InMemoryStore } from "./InMemoryStore"
import { FileStore } from "./PersistedStore"
import { StoreDiagnostics_Token } from "./StoreDiagnostics"
import { UserStore_Token } from "./UserStore"

const useFactory = () => {
	return process.env["PRT_PERSIST_TO_FILE"] === "true"
		? FileStore.getSharedInstance()
		: InMemoryStore.getSharedInstance()
}

@Module({
	providers: [
		{
			provide: UserStore_Token,
			useFactory
		},
		{
			provide: GroupStore_Token,
			useFactory
		},
		{
			provide: StoreDiagnostics_Token,
			useFactory
		}
	],
	exports: [UserStore_Token, GroupStore_Token, StoreDiagnostics_Token]
})
export class StoreModule {}
