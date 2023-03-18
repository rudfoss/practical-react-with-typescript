import { Module } from "@nestjs/common"

import { GroupStore_Token } from "./GroupStore"
import { InMemoryStore } from "./InMemoryStore"
import { StoreDiagnostics_Token } from "./StoreDiagnostics"
import { UserStore_Token } from "./UserStore"

@Module({
	providers: [
		{
			provide: UserStore_Token,
			useFactory: () => InMemoryStore.getSharedInstance()
		},
		{
			provide: GroupStore_Token,
			useFactory: () => InMemoryStore.getSharedInstance()
		},
		{
			provide: StoreDiagnostics_Token,
			useFactory: () => InMemoryStore.getSharedInstance()
		}
	],
	exports: [UserStore_Token, GroupStore_Token, StoreDiagnostics_Token]
})
export class StoreModule {}
