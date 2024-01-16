import { InputType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @MinLength(8)
  password: string;

  @Field(() => Boolean)
  @IsBoolean()
  readonly active: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsMongoId()
  readonly organization?: Types.ObjectId;

  @Field(() => String)
  @IsNotEmpty()
  @IsMongoId()
  readonly role: Types.ObjectId;
}
