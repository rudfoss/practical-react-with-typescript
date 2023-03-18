import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common"
import { NotFoundException } from "@nestjs/common/exceptions"
import {
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from "@nestjs/swagger"
import { nanoid } from "nanoid"

import { GroupStore, GroupStore_Token } from "../store"

import { GroupDTO, GroupMembershipsDTO, GroupWithoutIDDTO, UserIdsDTO } from "./dtos"

@Controller("groups")
@ApiTags("Groups")
export class GroupsController {
	public constructor(@Inject(GroupStore_Token) protected readonly groupStore: GroupStore) {}

	@Get(":id")
	@ApiOperation({
		description: "Get a specific group based on their ID"
	})
	@ApiOkResponse({
		type: GroupDTO
	})
	@ApiNotFoundResponse({
		description: "No group with this ID exists"
	})
	public async getGroup(@Param("id") id: string) {
		const group = await this.groupStore.getGroup(id)
		if (!group) throw new NotFoundException(`No group with id ${id} exists`)
		return group
	}

	@Get()
	@ApiOperation({
		description: "Get all groups in the system"
	})
	@ApiOkResponse({
		description: "All groups",
		type: GroupDTO,
		isArray: true
	})
	public async getGroups() {
		return Array.from(await this.groupStore.getGroups())
	}

	@Post()
	@ApiOperation({
		description: "Create a new group with a new ID"
	})
	@ApiCreatedResponse({
		description: "The newly created group",
		type: GroupDTO
	})
	public async createGroup(@Body() createGroupDto: GroupWithoutIDDTO) {
		const id = nanoid()
		return this.groupStore.setGroup({
			...createGroupDto,
			id
		})
	}

	@Put()
	@ApiOperation({
		description: "Update an existing group."
	})
	@ApiOkResponse({
		description: "The updated group",
		type: GroupDTO
	})
	@ApiNotFoundResponse({
		description: "No group with the given ID exists"
	})
	public async updateGroup(@Body() updateGroupDto: GroupDTO) {
		if (!(await this.groupStore.getGroup(updateGroupDto.id))) {
			throw new NotFoundException(`No group with id ${updateGroupDto.id} found`)
		}
		return this.groupStore.setGroup(updateGroupDto)
	}

	@Delete(":id")
	@ApiOperation({
		description: "Delete a specific group"
	})
	@ApiOkResponse({
		description: "The deleted group",
		type: GroupDTO
	})
	@ApiNotFoundResponse({
		description: "No group with the given id exists"
	})
	public async deleteGroup(@Param("id") id: string) {
		const group = await this.groupStore.deleteGroup(id)
		if (!group) throw new NotFoundException(`No group with id ${id} exists`)
		return group
	}

	@Get(":id/members")
	@ApiOperation({
		description: "Get all members of a specific group."
	})
	@ApiOkResponse({
		description: "User ids for all members of the group.",
		type: UserIdsDTO
	})
	@ApiNotFoundResponse({
		description: "No group exists with the specified id."
	})
	public async getMembers(@Param("id") id: string) {
		const members = await this.groupStore.getMembersOfGroup(id)
		if (!members) throw new NotFoundException(`No group exists with the id ${id}`)
		return members.memberIds
	}

	@Put(":id/members")
	@ApiOperation({
		description: "Set members of the specific group"
	})
	@ApiOkResponse({
		description: "The new members of the group",
		type: GroupMembershipsDTO
	})
	public async setMembers(@Param("id") id: string, @Body() userIds: UserIdsDTO) {
		return this.groupStore.setMembersOfGroup(id, userIds)
	}
}
