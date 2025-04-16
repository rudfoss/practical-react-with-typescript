import { Inject, Injectable, Optional } from "@nestjs/common"

import { HttpConflictException } from "../httpExceptions"
import {
	Group,
	NewGroup,
	NewUser,
	PatchGroup,
	PatchUser,
	User,
	UserDatabaseRole,
	UserSession,
	UserWithPassword
} from "../models"
import { UserInformation } from "../models/UserInformation"
import { StorageService, StorageServiceKey } from "../storage"
import { GUEST_GROUP_ID } from "../storage/defaultStoreData"

import { LoginRequest } from "./LoginRequest"
import { UidGenerator, UidGeneratorKey } from "./UidGenerator"

/**
 * Default lifetime for sessions
 */
export const SESSOIN_LIFETIME_MS = 1000 * 60 * 30 // 30 minutes in ms

export interface SessionUserRoles {
	session?: UserSession
	user?: User
	groups?: Group[]
	roles?: UserDatabaseRole[]
}

@Injectable()
export class AuthService {
	public constructor(
		@Inject(StorageServiceKey) protected storageService: StorageService,
		@Inject(UidGeneratorKey) protected uidGenerator: UidGenerator,
		@Optional() protected defaultGroupId: string = GUEST_GROUP_ID,
		@Optional() protected defaultRole: UserDatabaseRole = UserDatabaseRole.Guest
	) {}

	public async getUserWithPasswordByUsername(username: string) {
		const users = await this.storageService.getUsers()
		return users.find((user) => user.username === username)
	}
	public async getUserByUsername(username: string) {
		const userWithPassword = await this.getUserWithPasswordByUsername(username)
		return userWithPassword ? new User(userWithPassword, { whitelist: true }) : undefined
	}
	public async getUser(username: string, password: string) {
		const userWithPassword = await this.getUserWithPasswordByUsername(username)
		if (!userWithPassword) return
		if (userWithPassword.password !== password) return

		return new User(userWithPassword, { whitelist: true })
	}
	public async getUserWithPasswordById(userId: string) {
		const users = await this.storageService.getUsers()
		return users.find((user) => user.id === userId)
	}
	public async getUserById(userId: string) {
		const users = await this.storageService.getUsers()
		const userWithPassword = users.find((user) => user.id === userId)
		if (!userWithPassword) return
		return new User(userWithPassword, { whitelist: true })
	}
	public async getUserGroups(user: User) {
		const groups = await this.storageService.getGroups()
		return groups.filter((group) => user.groupIds?.includes(group.id))
	}
	public async getUserInformation(userId: string) {
		const user = await this.getUserById(userId)
		if (!user) return

		const groups = (await this.getUserGroups(user)) ?? []
		const roles = new Set(groups.flatMap((group) => group.roles))

		return new UserInformation({
			user,
			groups,
			roles: [...roles]
		})
	}
	public async getUsersByRole(role: UserDatabaseRole) {
		const groupsWithRole = await this.getGroupsByRole(role)
		const groupIdsWithRole = new Set(groupsWithRole.map((group) => group.id))
		const users = await this.getUsers()
		return users.filter((user) => user.groupIds?.some((groupId) => groupIdsWithRole.has(groupId)))
	}
	public async getUsersInGroups(groupIds: string[]) {
		const groupsToFind = new Set(groupIds)
		const allUsers = await this.storageService.getUsers()
		const members = allUsers.filter((user) => user.groupIds.some((groupId) => groupsToFind.has(groupId)))
		return members.map((member) => new User(member, { whitelist: true }))
	}

	public async getUsersWithPassword() {
		return this.storageService.getUsers()
	}
	public async getUsers() {
		const usersWithPassword = await this.getUsersWithPassword()
		return usersWithPassword.map((userWithPassword) => new User(userWithPassword, { whitelist: true }))
	}
	public async createUser(newUser: NewUser) {
		const userWithPassword = new UserWithPassword(
			{
				groupIds: [this.defaultGroupId],
				...newUser,
				id: this.uidGenerator()
			},
			{ forbidNonWhitelisted: true }
		)

		await this.storageService.setUsers((existingUsers) => {
			existingUsers.push(userWithPassword)
			return existingUsers
		})

		return new User(userWithPassword, { whitelist: true })
	}
	public async patchUser(patchUser: PatchUser, userId: string) {
		const existingUser = await this.getUserWithPasswordById(userId)
		if (!existingUser) return

		const patchedUser = new UserWithPassword(
			{ ...existingUser, ...patchUser },
			{ forbidNonWhitelisted: true }
		)

		const [lastAdmin, ...otherAdmins] = await this.getUsersByRole(UserDatabaseRole.Admin)
		if (otherAdmins.length === 0 && lastAdmin.id === userId) {
			const patchedUserNewGroups = await Promise.all(
				patchedUser.groupIds.map((groupId) => this.getGroupById(groupId))
			)
			const patcherUserNewRoles = new Set(patchedUserNewGroups.flatMap((group) => group?.roles))
			if (!patcherUserNewRoles.has(UserDatabaseRole.Admin)) {
				throw new HttpConflictException(
					`User ${userId} is the last administrator. You cannot remove their admin group membership.`
				)
			}
		}

		await this.storageService.setUsers((existingUsers) => {
			const nextUsers = existingUsers.filter((user) => user.id !== userId)
			nextUsers.push(patchedUser)
			return nextUsers
		})

		return new User(patchedUser, { whitelist: true })
	}
	public async deleteUser(userId: string) {
		const userInformation = await this.getUserInformation(userId)
		if (!userInformation) return
		const { roles, user } = userInformation
		if (roles.includes(UserDatabaseRole.Admin)) {
			const usersWithAdminRole = await this.getUsersByRole(UserDatabaseRole.Admin)
			if (usersWithAdminRole.length <= 1) {
				throw new HttpConflictException(`User ${userId} is the last administrator and cannot be deleted.`)
			}
		}

		await this.storageService.setUsers((existingUsers) => existingUsers.filter((user) => user.id !== userId))
		return user
	}

	public async login({ username, password }: LoginRequest) {
		const user = await this.getUser(username, password)
		if (!user) return

		return this.createSession(user.id)
	}
	public async getSession(sessionToken: string) {
		const allSessions = await this.storageService.getUserSessions()
		const session = allSessions.find((session) => session.token === sessionToken)
		return await this.isSessionActive(session)
	}
	public async createSession(userId: string, basedOnSesssion?: UserSession) {
		const now = Date.now()
		const newSession = new UserSession({
			createdAt: now,
			...basedOnSesssion,
			userId,
			token: this.uidGenerator(),
			expiresAt: now + SESSOIN_LIFETIME_MS
		})

		await this.storageService.setUserSessions((oldSessions) => {
			const nextSesssions = oldSessions.filter((session) => session.token !== basedOnSesssion?.token)
			nextSesssions.push(newSession)
			return nextSesssions
		})

		return newSession
	}
	public async logout(sessionToken: string) {
		await this.storageService.setUserSessions((oldSessions) =>
			oldSessions.filter((session) => session.token !== sessionToken)
		)
	}

	public async getGroups() {
		return this.storageService.getGroups()
	}
	public async getGroupById(groupId: string) {
		const groups = await this.getGroups()
		return groups.find((group) => group.id === groupId)
	}
	public async getGroupsByRole(role: UserDatabaseRole) {
		const allGroups = await this.getGroups()
		return allGroups.filter((group) => group.roles.includes(role))
	}
	public async createGroup(newGroup: NewGroup) {
		const fullNewGroup = new Group(
			{
				roles: [this.defaultRole],
				...newGroup,
				id: this.uidGenerator()
			},
			{ forbidNonWhitelisted: true }
		)

		await this.storageService.setGroups((existingGroups) => {
			existingGroups.push(fullNewGroup)
			return existingGroups
		})

		return fullNewGroup
	}
	public async patchGroup(patchGroup: PatchGroup, groupId: string) {
		const existingGroup = await this.getGroupById(groupId)
		if (!groupId) return

		const patchedGroup = new Group(
			{
				...existingGroup,
				...patchGroup
			},
			{ forbidNonWhitelisted: true }
		)

		await this.storageService.setGroups((oldGroups) => {
			const nextGroups = oldGroups.filter((group) => group.id !== groupId)
			nextGroups.push(patchedGroup)
			return nextGroups
		})

		return patchedGroup
	}
	public async deleteGroup(groupId: string) {
		const deletedGroup = await this.getGroupById(groupId)
		if (!deletedGroup) return
		if (deletedGroup.isSystemDefined)
			throw new HttpConflictException(`Group ${groupId} is a system group and cannot be deleted.`)

		const oldMembers = await this.getUsersInGroups([groupId])
		if (oldMembers.some((oldMember) => oldMember.groupIds.length === 1)) {
			throw new HttpConflictException(
				`One or more users are only members of the group ${groupId}. Add users to at least one more group before you delete this one.`
			)
		}

		await this.storageService.setGroups((groups) => groups.filter((group) => group.id !== groupId))
		for (const oldMember of oldMembers) {
			await this.patchUser(
				{
					groupIds: oldMember.groupIds.filter((memberGroupId) => memberGroupId !== groupId)
				},
				oldMember.id
			)
		}

		return deletedGroup
	}

	protected async isSessionActive(session?: UserSession) {
		if (!session) return
		const now = Date.now()
		if (session.expiresAt <= now) {
			await this.logout(session.token)
			return
		}
		return session
	}
}
