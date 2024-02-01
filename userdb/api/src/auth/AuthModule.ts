import { Module } from "@nestjs/common"

import { esmLoader } from "@react-workshop/utils"

import { StorageModule } from "../storage"

import { AuthController } from "./AuthController"
import { AuthService } from "./AuthService"
import { AuthUserController } from "./AuthUserController"
import { UidGeneratorKey } from "./UidGenerator"

const importNanoid = () => esmLoader<typeof import("nanoid")>("nanoid")

@Module({
	imports: [StorageModule],
	providers: [
		AuthService,
		{
			provide: UidGeneratorKey,
			useFactory: async () => {
				const { nanoid } = await importNanoid()
				return nanoid
			}
		}
	],
	controllers: [AuthController, AuthUserController],
	exports: [AuthService]
})
export class AuthModule {}
