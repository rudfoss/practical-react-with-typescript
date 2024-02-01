import { Group, PatchUser, User, UserDatabaseRole, UserSession, UserWithPassword } from "../models"
import { Setter, StorageService } from "../storage"
import { StorageData } from "../storage/StorageData"

import { AuthService } from "./AuthService"

const mockUidGenerator = (() => {
	const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_"
	const alphabetLength = alphabet.length

	return (length = 42) => {
		let chars = ""
		let count = 0
		while (count++ < length) {
			chars += alphabet[Math.floor(Math.random() * alphabetLength)]
		}
		return chars
	}
})()

const ADMIN_USER_ID = "83b91179-dd6a-4f95-8f58-a0abd85fddd2"
const GUEST_USER_ID = "46e8045a-9b36-4dc5-aef1-2028771ad5d6"
const ADMIN_GROUP_ID = "f285a99c-f968-4fca-8fde-be71ce3441dc"
const GUEST_GROUP_ID = "0e8fb72a-8431-4434-b91e-8b2246292bb5"

const createServiceMocks = () => {
	const store: StorageData = {
		users: [
			{
				id: ADMIN_USER_ID,
				displayName: "The Admin",
				username: "admin",
				password: "admin",
				groupIds: [ADMIN_GROUP_ID]
			},
			{
				id: GUEST_USER_ID,
				displayName: "Guest",
				username: "guest",
				password: "guest",
				groupIds: [GUEST_GROUP_ID]
			}
		],
		groups: [
			{
				id: ADMIN_GROUP_ID,
				displayName: "Administrator",
				description: "The administrator role has full access.",
				roles: [UserDatabaseRole.Admin],
				isSystemDefined: true
			},
			{
				id: GUEST_GROUP_ID,
				displayName: "Guests",
				description: "Guest users have access to only their own information.",
				roles: [UserDatabaseRole.Guest]
			}
		],
		userSessions: []
	}

	const get =
		<TDBItem extends keyof StorageData>(
			key: TDBItem,
			instanceFactory: (data: StorageData[TDBItem][number]) => StorageData[TDBItem][number]
		) =>
		async (): Promise<StorageData[TDBItem]> => {
			const data = store[key]
			// Typescript can't follow this through to the end, but the type is correct from the outside
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const instances = data.map((item) => instanceFactory(item)) as any
			return instances
		}
	const set =
		<TDBItem extends keyof StorageData>(key: TDBItem) =>
		async (valueSetter: Setter<StorageData[TDBItem]>) =>
			(store[key] = await valueSetter(store[key]))

	const storageService: StorageService = {
		getGroups: jest.fn(get("groups", (group) => new Group(group))),
		setGroups: jest.fn(set("groups")),

		getUsers: jest.fn(get("users", (user) => new UserWithPassword(user))),
		setUsers: jest.fn(set("users")),

		getUserSessions: jest.fn(get("userSessions", (userSession) => new UserSession(userSession))),
		setUserSessions: jest.fn(set("userSessions"))
	}

	const uidGenerator = jest.fn(() => mockUidGenerator())

	return {
		store,
		storageService,
		uidGenerator,
		authService: new AuthService(storageService, uidGenerator)
	}
}

const { setGlobalTime } = (() => {
	let nowTime = Date.now()
	jest.spyOn(Date, "now").mockImplementation(() => nowTime)
	return {
		setGlobalTime: (newTime: number) => {
			nowTime = newTime
		}
	}
})()

describe("AuthService", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("is defined", () => {
		expect(typeof AuthService).toBe("function")

		const { authService } = createServiceMocks()
		expect(authService).toBeInstanceOf(AuthService)
	})

	describe("users", () => {
		it("returns users by username", async () => {
			const { authService } = createServiceMocks()
			const userWithPassword = await authService.getUserWithPasswordByUsername("admin")
			expect(userWithPassword).toBeInstanceOf(UserWithPassword)

			const user = await authService.getUserByUsername("admin")
			expect(user).toBeInstanceOf(User)
		})
		it("returns user by username and password", async () => {
			const { authService } = createServiceMocks()
			const user = await authService.getUser("admin", "admin")
			const notUser = await authService.getUser("admin2", "sdjhfdsklf")

			expect(user).toBeInstanceOf(User)
			expect(notUser).not.toBeDefined()
		})
		it("returns user by id", async () => {
			const { authService } = createServiceMocks()
			const user = await authService.getUserById(ADMIN_USER_ID)
			const notUser = await authService.getUserById("0d2811e4-18c8-4aeb-beb1-ebd06d58fd0d")

			expect(user).toBeInstanceOf(User)
			expect(notUser).not.toBeDefined()
		})
		it("returns user with password by id", async () => {
			const { authService } = createServiceMocks()
			const user = await authService.getUserWithPasswordById(ADMIN_USER_ID)
			const notUser = await authService.getUserWithPasswordById(
				"da876ee7-e02d-4714-81f3-27139d124a49"
			)

			expect(user).toBeInstanceOf(UserWithPassword)
			expect(user).toBeInstanceOf(User)
			expect(notUser).not.toBeDefined()
		})
		it("returns actual group instances for a user", async () => {
			const { authService } = createServiceMocks()
			const user = await authService.getUserById(ADMIN_USER_ID)
			const groups = await authService.getUserGroups(user!)

			expect(groups.length).toBe(1)
		})
		it("returns extended user information", async () => {
			const { authService } = createServiceMocks()
			const userInformation = await authService.getUserInformation(ADMIN_USER_ID)

			expect(userInformation).toBeDefined()
			expect(userInformation!.groups.length).toBe(1)
			expect(userInformation!.roles.length).toBe(1)
			expect(userInformation!.roles.includes(UserDatabaseRole.Admin)).toBe(true)
		})
	})

	describe("session", () => {
		it("creates a session when user is logged in", async () => {
			const { authService } = createServiceMocks()
			const session = await authService.login({ username: "admin", password: "admin" })

			expect(session).toBeDefined()
		})
		it("can retrieve a created session", async () => {
			const { authService } = createServiceMocks()
			const loginSession = await authService.login({ username: "admin", password: "admin" })
			const retrievedSession = await authService.getSession(loginSession!.token)
			expect(loginSession).toEqual(retrievedSession)
		})
		it("can refresh an existing session keeping the originial createdAt", async () => {
			const { authService } = createServiceMocks()
			const loginSession = await authService.login({ username: "admin", password: "admin" })
			setGlobalTime(Date.now() + 3600)

			const refreshedSession = await authService.createSession(loginSession!.userId, loginSession!)

			expect(refreshedSession!).toEqual({
				...loginSession!,
				expiresAt: loginSession!.expiresAt + 3600
			})
		})
		it("can logout sessions", async () => {
			const { authService } = createServiceMocks()
			const session = await authService.login({ username: "admin", password: "admin" })

			const activeSession = await authService.getSession(session!.token)
			expect(activeSession).toBeDefined()

			await authService.logout(session!.token)
			const loggedOutSession = await authService.getSession(session!.token)
			expect(loggedOutSession).toBeUndefined()
		})
		it("does not return expired sessions", async () => {
			const { authService } = createServiceMocks()
			const session = await authService.login({ username: "admin", password: "admin" })

			setGlobalTime(session!.expiresAt + 1)
			const expiredSession = await authService.getSession(session!.token)
			expect(expiredSession).toBeUndefined()
		})
	})

	describe("mutate users", () => {
		it("can create new users", async () => {
			const { authService, store } = createServiceMocks()
			const usersBeforeNew = [...store.users]

			const newUser = await authService.createUser({
				username: "mockUser",
				password: "mockPassword",
				displayName: "Mock user"
			})
			expect(newUser).toBeInstanceOf(User)
			expect(store.users.length).toBe(usersBeforeNew.length + 1)
		})
		it("always creates a new id", async () => {
			const { authService } = createServiceMocks()
			const newUser = await authService.createUser({
				id: "id",
				username: "mockUser",
				password: "mockPassword",
				displayName: "Mock user"
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any)

			expect(newUser.id).not.toEqual("id")
		})
		it("supports patching user properties", async () => {
			const { authService, store } = createServiceMocks()
			const user = await authService.getUserById(ADMIN_USER_ID)
			const usersBeforePatch = [...store.users]

			const userPatches: PatchUser = {
				displayName: "New admin display name",
				password: "admin2"
			}
			const updatedUser = await authService.patchUser(userPatches, user!.id)
			expect(updatedUser).toEqual({ ...user, ...updatedUser })

			const refetcehdUser = await authService.getUserById(ADMIN_USER_ID)
			expect(refetcehdUser).toEqual(updatedUser)

			expect(usersBeforePatch.length).toEqual(store.users.length)
		})
		it("changes nothing if trying to patch non-existent user", async () => {
			const { authService, store } = createServiceMocks()
			const usersBeforePatch = [...store.users]

			const patchedUser = await authService.patchUser(
				{
					displayName: "New display name"
				},
				"d9e59cee-6ab1-490e-9d75-be6e1c0b68ee"
			)
			expect(patchedUser).not.toBeDefined()
			expect(usersBeforePatch).toEqual(store.users)
		})
		it("can delete users", async () => {
			const { authService, store } = createServiceMocks()
			const usersBeforeDelete = [...store.users]

			const deletedUser = await authService.deleteUser(ADMIN_USER_ID)
			expect(deletedUser).toBeInstanceOf(User)

			expect(store.users.length).toBe(usersBeforeDelete.length - 1)
			expect(usersBeforeDelete.filter((aUser) => aUser.id !== deletedUser!.id)).toEqual(store.users)
		})
		it("changes nothing if trying to delete non-existent user", async () => {
			const { authService, store } = createServiceMocks()
			const usersBeforeDelete = [...store.users]

			const deletedUser = await authService.deleteUser("8d1af37b-6c08-4872-ba1f-63b43169745e")
			expect(deletedUser).not.toBeDefined()
			expect(usersBeforeDelete).toEqual(store.users)
		})
	})
})
