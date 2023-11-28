import { Module } from "@nestjs/common"
import { WarehouseService } from "./WarehouseService"
import { InMemoryWarehouseService } from "./InMemoryWarehouseService"
import { WarehouseController } from "./WarehouseController"

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
