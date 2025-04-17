import path from "node:path"

import { Module } from "@nestjs/common"

import { FileStorageService, FileStorageServiceOptions } from "./FileStorage.service"
import { StorageServiceKey, StorageServiceOptionsKey } from "./Storage.service"

@Module({
	providers: [
		{
			provide: StorageServiceOptionsKey,
			useValue: { fileName: path.resolve(process.cwd(), "jsonDb.json") }
		},
		{
			provide: StorageServiceKey,
			inject: [StorageServiceOptionsKey],
			useFactory: async (options: FileStorageServiceOptions) => FileStorageService.createInstance(options)
		}
	],
	exports: [StorageServiceOptionsKey, StorageServiceKey]
})
export class StorageModule {}
