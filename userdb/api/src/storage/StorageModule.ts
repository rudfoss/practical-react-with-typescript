import path from "node:path"

import { Module } from "@nestjs/common"

import { JSONFileStorageService, JSONFileStorageServiceOptions } from "./JSONFileStorageService"
import { StorageServiceKey, StorageServiceOptionsKey } from "./StorageService"

@Module({
	providers: [
		{
			provide: StorageServiceOptionsKey,
			useValue: { fileName: path.resolve(__dirname, "jsonDb.json") }
		},
		{
			provide: StorageServiceKey,
			inject: [StorageServiceOptionsKey],
			useFactory: async (options: JSONFileStorageServiceOptions) =>
				JSONFileStorageService.createInstance(options)
		}
	],
	exports: [StorageServiceOptionsKey, StorageServiceKey]
})
export class StorageModule {}
