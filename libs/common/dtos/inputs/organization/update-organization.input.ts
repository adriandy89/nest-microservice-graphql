import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

import { CreateOrganizationInput } from './create-organization.input';
import { Types } from 'mongoose';

@InputType()
export class UpdateOrganizationInput extends PartialType(
  CreateOrganizationInput,
) {
  @Field(() => String)
  @IsMongoId()
  _id: Types.ObjectId;
}
