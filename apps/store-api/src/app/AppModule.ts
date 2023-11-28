import { Module } from "@nestjs/common"
import { AppController } from "./AppController"
import { ProductsModule } from "../products"
import { ServeStaticModule } from "@nestjs/serve-static"
import path from "node:path"
import { WarehouseModule } from "../warehouse"
import { AuthModule } from "../auth"

@Module({
	imports: [
		AuthModule,
		ProductsModule,
		WarehouseModule,
		ServeStaticModule.forRoot({
			serveRoot: "/static",
			rootPath: path.join(__dirname, "static")
		})
	],
	controllers: [AppController],
	providers: []
})
export class AppModule {}
