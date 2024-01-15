import { ArgsType, Field } from '@nestjs/graphql';
import { IsDefined, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

@ArgsType()
export class ValidIdArgs {
  @Field(() => String)
  @IsDefined()
  @IsMongoId()
  id: Types.ObjectId;
}
