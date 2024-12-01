import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger"
import {
  ArrayMinSize,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  ValidatorOptions
} from "class-validator"

import { ObjectFields, ValidationError } from "@practical-react/utils"

import { UserDatabaseRole } from "./UserDatabaseRole"

export class Group {
  public constructor(
    initialData?: Partial<ObjectFields<Group>>,
    validatorOptions?: ValidatorOptions
  ) {
    if (initialData) {
      Object.assign(this, initialData)
      ValidationError.validateOrThrow(this, validatorOptions)
    }
  }

  @ApiProperty({
    minLength: 21,
    maxLength: 128
  })
  @IsString()
  @Length(21, 128)
  id: string

  @ApiProperty({
    minLength: 1,
    maxLength: 256
  })
  @IsString()
  @Length(1, 256)
  displayName: string

  @ApiProperty({
    maxLength: 8196,
    required: false
  })
  @IsString()
  @IsOptional()
  @MaxLength(8196)
  description?: string

  @ApiProperty({
    required: false,
    description: "System-defined groups cannot be removed."
  })
  @IsBoolean()
  @IsOptional()
  isSystemDefined?: boolean

  @ApiProperty({
    enum: UserDatabaseRole,
    description: "The roles assigned to users in this group.",
    minLength: 1,
    isArray: true
  })
  @ArrayMinSize(1)
  @IsEnum(UserDatabaseRole, { each: true })
  roles: UserDatabaseRole[]
}

/**
 * New groups are given a generated id.
 */
export class NewGroup extends OmitType(Group, ["id", "roles"] as const) {
  @ApiProperty({
    name: "UserDatabaseRole",
    enum: UserDatabaseRole,
    description:
      "The roles assigned to users in this group. If not specified the Guest role will be added.",
    minLength: 1,
    required: false,
    isArray: true
  })
  @IsOptional()
  @ArrayMinSize(1)
  @IsEnum(UserDatabaseRole, { each: true })
  roles?: UserDatabaseRole[]
}

export class PatchGroup extends PartialType(NewGroup) {}
