import { Module } from "@nestjs/common"
import { AppController } from "./AppController"
import { ProductsModule } from "../products"

@Module({
	imports: [ProductsModule],
	controllers: [AppController],
	providers: []
})
export class AppModule {}
