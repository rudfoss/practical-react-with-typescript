import path from "node:path"

import { Module } from "@nestjs/common"

import { FileStorageService, FileStorageServiceOptions } from "./FileStorageService"
import { StorageServiceKey, StorageServiceOptionsKey } from "./StorageService"

@Module({
	providers: [
		{
			provide: StorageServiceOptionsKey,
			useValue: { fileName: path.resolve(process.cwd(), "jsonDb.json") }
		},
		{
			provide: StorageServiceKey,
			inject: [StorageServiceOptionsKey],
			useFactory: async (options: FileStorageServiceOptions) =>
				FileStorageService.createInstance(options)
		}
	],
	exports: [StorageServiceOptionsKey, StorageServiceKey]
})
export class StorageModule {}
