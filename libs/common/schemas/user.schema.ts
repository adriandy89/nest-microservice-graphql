import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractDocument } from '../database';
import { Types } from 'mongoose';
import { OrganizationDocument } from './organization.schema';
import { RoleDocument } from './role.schema';

@Schema({ versionKey: false, timestamps: true, collection: 'users' })
@ObjectType()
export class UserDocument extends AbstractDocument {
  @Prop({ type: String, required: true })
  @Field(() => String)
  name: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  @Field(() => String)
  username: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  @Field(() => String)
  email: string;

  @Prop({ type: String, required: true })
  // @Field(() => String)
  password: string;

  @Prop({ type: Boolean, required: false, default: false })
  @Field(() => Boolean)
  active: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: OrganizationDocument.name,
    required: true,
  })
  @Field(() => String)
  organization: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: RoleDocument.name, required: true })
  // @Field(() => String)
  @Field(() => RoleDocument)
  role: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);

// import { ORGANIZATION, ROLE } from 'libs/common/models/db.model';
// import { Schema, Types } from 'mongoose';

// export const UserSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     username: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     active: { type: Boolean, required: false, default: false },
//     organization: {
//       type: Types.ObjectId,
//       ref: ORGANIZATION.name,
//       required: true,
//     },
//     role: { type: Types.ObjectId, ref: ROLE.name, required: true },
//   },
//   { timestamps: true },
// );

// UserSchema.index({ username: 1 }, { unique: true });
// UserSchema.index({ email: 1 }, { unique: true });
