import { ZodValidationPipe } from "@anatine/zod-nestjs"
import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	NotFoundException,
	Param,
	Post,
	Put,
	UsePipes
} from "@nestjs/common"
import {
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger"
import { nanoid } from "nanoid"

import { UserStore, UserStore_Token } from "../store"

import { GroupIds, User, UserMemberships, UserWithoutID } from "./models"

@Controller("users")
@ApiTags("Users")
@UsePipes(ZodValidationPipe)
export class UsersController {
	public constructor(
		@Inject(UserStore_Token) protected readonly userStore: UserStore
	) {}

	@Get(":id")
	@ApiOperation({
		description: "Get a specific user based on their ID"
	})
	@ApiOkResponse({
		type: User
	})
	@ApiNotFoundResponse({
		description: "No user with this ID exists"
	})
	public async getUser(@Param("id") id: string) {
		const user = await this.userStore.getUser(id)
		if (!user) throw new NotFoundException(`No user with id ${id}`)
		return user
	}

	@Get()
	@ApiOperation({
		description: "Get all users in the system"
	})
	@ApiOkResponse({
		description: "The user",
		type: User,
		isArray: true
	})
	public async getUsers() {
		return Array.from(await this.userStore.getUsers())
	}

	@Post()
	@ApiOperation({
		description: "Create a new user with a new ID"
	})
	@ApiCreatedResponse({
		description: "The newly created user",
		type: User
	})
	public async createUser(@Body() createUserDto: UserWithoutID) {
		const id = nanoid()
		return this.userStore.setUser({
			...createUserDto,
			id
		})
	}

	@Put()
	@ApiOperation({
		description: "Update an existing user."
	})
	@ApiOkResponse({
		description: "The updated user",
		type: User
	})
	@ApiNotFoundResponse({
		description: "No user with the given ID exists"
	})
	public async updateUser(@Body() updateUserDto: User) {
		if (!(await this.userStore.getUser(updateUserDto.id))) {
			throw new NotFoundException(`No user with id ${updateUserDto.id} found`)
		}
		return this.userStore.setUser(updateUserDto)
	}

	@Delete(":id")
	@ApiOperation({
		description: "Delete a specific user"
	})
	@ApiOkResponse({
		description: "The deleted user",
		type: User
	})
	@ApiNotFoundResponse({
		description: "No user with the given id exists"
	})
	public async deleteUser(@Param("id") id: string) {
		const deletedUser = await this.userStore.deleteUser(id)
		if (!deletedUser) {
			throw new NotFoundException(`No user with id ${id} exists`)
		}
		return deletedUser
	}

	@Get(":id/memberships")
	@ApiOperation({
		description: "Get all memberships for the user"
	})
	@ApiOkResponse({
		description: "All memberships for the current user",
		type: GroupIds
	})
	@ApiNotFoundResponse({
		description: "No user exists with the specified id"
	})
	public async getUserMemberships(@Param("id") id: string) {
		const memberships = await this.userStore.getUserMemberships(id)
		if (!memberships)
			throw new NotFoundException(`No user exists with the id ${id}`)
		return memberships.memberOfIds
	}

	@Put(":id/memberships")
	@ApiOperation({
		description: "Set user memberships to the specified group ids"
	})
	@ApiOkResponse({
		description: "The new memberships for the user",
		type: UserMemberships
	})
	public async setUserMemberships(
		@Param("id") id: string,
		@Body() groupIds: GroupIds
	) {
		return this.userStore.setUserMemberships(id, groupIds)
	}
}
