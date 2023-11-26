import { Module } from "@nestjs/common"
import { AppController } from "./AppController"
import { ProductsModule } from "../products"
import { ServeStaticModule } from "@nestjs/serve-static"
import path from "node:path"

@Module({
	imports: [
		ProductsModule,
		ServeStaticModule.forRoot({
			serveRoot: "/static",
			rootPath: path.join(__dirname, "static")
		})
	],
	controllers: [AppController],
	providers: []
})
export class AppModule {}
