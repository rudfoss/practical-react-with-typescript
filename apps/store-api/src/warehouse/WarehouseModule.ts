import { Module } from "@nestjs/common"

import { InMemoryWarehouseService } from "./InMemoryWarehouseService"
import { WarehouseController } from "./WarehouseController"
import { WarehouseService } from "./WarehouseService"

@Module({
	providers: [
		{
			provide: WarehouseService,
			useClass: InMemoryWarehouseService
		}
	],
	controllers: [WarehouseController],
	exports: [WarehouseService]
})
export class WarehouseModule {}
