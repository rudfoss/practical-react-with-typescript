import { Inject } from "@nestjs/common"

import { StorageService, StorageServiceKey } from "../storage"

export class AuthService {
	public constructor(@Inject(StorageServiceKey) protected storageService: StorageService) {}
}
