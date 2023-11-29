import path from "node:path"

import { Module } from "@nestjs/common"
import { ServeStaticModule } from "@nestjs/serve-static"

import { AuthModule } from "../auth"
import { ProductsModule } from "../products"
import { WarehouseModule } from "../warehouse"

import { AppController } from "./AppController"

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
