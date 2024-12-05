import {
  AppControllerClient,
  AuthControllerClient,
  AuthUserControllerClient,
  GroupsControllerClient,
  UsersControllerClient
} from "./UserDbApiClients"
import { UserDbApiClientsBaseClass } from "./UserDbApiClientsBaseClass"
import { ProvideApiClientsService } from "./apiClientsService"

describe("apiClientsService", () => {
  it("is defined", () => {
    expect(typeof ProvideApiClientsService).toBe("function")
  })
})
describe("Generated UserDbApiClients", () => {
  it("is all defined", () => {
    expect(typeof AppControllerClient).toBe("function")
    expect(typeof AuthControllerClient).toBe("function")
    expect(typeof AuthUserControllerClient).toBe("function")
    expect(typeof UsersControllerClient).toBe("function")
    expect(typeof GroupsControllerClient).toBe("function")
  })
})
describe("UserDbApiClientsBaseClass", () => {
  it("is defined", () => {
    expect(typeof UserDbApiClientsBaseClass).toBe("function")
  })
  it("does not modify request object if token not set", async () => {
    const instance = new UserDbApiClientsBaseClass()
    const requestInit: RequestInit = {
      method: "GET"
    }

    const result = await instance.transformOptions(requestInit)
    expect(result).toBe(requestInit)
  })
  it("adds authorization header if token set", async () => {
    const instance = new UserDbApiClientsBaseClass()
    UserDbApiClientsBaseClass.bearerToken = "foo"
    const requestInit: RequestInit = {
      method: "GET"
    }

    const result = await instance.transformOptions(requestInit)
    expect(result).toBe(requestInit)
    expect(result.headers).toBeInstanceOf(Headers)
    expect((result.headers as Headers).get("Authorization")).toBeDefined()
    expect((result.headers as Headers).get("Authorization")).toEqual(
      "Bearer foo"
    )
  })
})
