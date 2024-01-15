import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class UserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @ApiProperty({ type: Boolean })
  @IsOptional()
  readonly active: boolean = false;
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly organization: Types.ObjectId;
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly role: Types.ObjectId;
}
