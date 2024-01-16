import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

import { CreateRoleInput } from './create-organization.input';
import { Types } from 'mongoose';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field(() => String)
  @IsMongoId()
  _id: Types.ObjectId;
}
