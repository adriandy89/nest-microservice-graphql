import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractDocument } from '../database';
import { Types } from 'mongoose';
import { Permissions, PERMISSIONS } from '../constants/module-access.constants';
import { OrganizationDocument } from './organization.schema';

@Schema({ versionKey: false, timestamps: true, collection: 'roles' })
@ObjectType()
export class RoleDocument extends AbstractDocument {
  @Prop({ type: String, required: true })
  @Field(() => String, { nullable: true })
  name: string;

  @Prop({
    type: Types.ObjectId,
    ref: OrganizationDocument.name,
    required: true,
  })
  @Field(() => String, { nullable: true })
  organization: Types.ObjectId;

  @Prop({
    type: {
      administration: {
        type: [String],
        enum: PERMISSIONS,
        required: false,
      },
      products: {
        type: [String],
        enum: PERMISSIONS,
        required: false,
      },
    },
    required: true,
  })
  @Field(() => PermissionsTypes, { nullable: true })
  permissions: {
    administration?: Permissions[];
    products?: Permissions[];
  };
}

@ObjectType()
class PermissionsTypes {
  @Field(() => [String], { nullable: true })
  administration: Permissions[];

  @Field(() => [String], { nullable: true })
  products: Permissions[];
}

export const RoleSchema = SchemaFactory.createForClass(RoleDocument);

// import { PERMISSIONS } from 'libs/common/constants/module-access.constants';
// import { ORGANIZATION } from 'libs/common/models/db.model';
// import { Schema, Types } from 'mongoose';

// export const RoleSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     organization: {
//       type: Types.ObjectId,
//       ref: ORGANIZATION.name,
//       required: true,
//     },
//     permissions: {
//       administration: {
//         type: [String],
//         enum: PERMISSIONS,
//         required: false,
//       },
//       products: {
//         type: [String],
//         enum: PERMISSIONS,
//         required: false,
//       },
//     },
//   },
//   { timestamps: true },
// );

// RoleSchema.index({ name: 1 }, { unique: true });
