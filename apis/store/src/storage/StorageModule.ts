import { Module } from "@nestjs/common"

import { JSONFileStorageService } from "./JSONFileStorageService"
import { StorageServiceKey } from "./StorageService"

@Module({
	providers: [
		{
			provide: StorageServiceKey,
			useFactory: async () => JSONFileStorageService.createInstance({ fileName: "jsonDb.json" })
		}
	],
	exports: [StorageServiceKey]
})
export class StorageModule {}
