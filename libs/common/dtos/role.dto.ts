import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Permissions } from '../constants/module-access.constants';

export class RoleDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  readonly organization: Types.ObjectId;
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  readonly permissions: {
    administration: Permissions[];
    products: Permissions[];
  };
}
