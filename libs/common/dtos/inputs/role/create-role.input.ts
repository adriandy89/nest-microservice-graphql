import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { PermissionsEnum } from 'libs/common/enums';
import { Types } from 'mongoose';

@InputType()
export class CreateRoleInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsMongoId()
  readonly organization?: Types.ObjectId;

  @Field(() => PermissionsInputs)
  @IsNotEmpty()
  readonly permissions: {
    administration?: Permissions[];
    products?: Permissions[];
  };
}

@InputType()
export class PermissionsInputs {
  @Field(() => [PermissionsEnum], { nullable: true })
  administration: Permissions[];

  @Field(() => [PermissionsEnum], { nullable: true })
  products: Permissions[];
}
