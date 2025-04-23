import { describe, expect, it } from "vitest"
import {
	AppControllerClient,
	AuthControllerClient,
	AuthUserControllerClient,
	GroupsControllerClient,
	UsersControllerClient
} from "./UserDbApiClients.generated"

describe("UserDbApiClients", () => {
	it("defines clients", () => {
		expect(typeof AppControllerClient).toBe("function")
		expect(typeof AuthControllerClient).toBe("function")
		expect(typeof AuthUserControllerClient).toBe("function")
		expect(typeof UsersControllerClient).toBe("function")
		expect(typeof GroupsControllerClient).toBe("function")
	})
})
