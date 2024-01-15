import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractDocument } from '../database';

@Schema({ versionKey: false, timestamps: true, collection: 'organizations' })
@ObjectType()
export class OrganizationDocument extends AbstractDocument {
  @Prop({ type: String, required: true, index: true, unique: true })
  @Field()
  name: string;
}

export const OrganizationSchema =
  SchemaFactory.createForClass(OrganizationDocument);

// import * as mongoose from 'mongoose';

// export const OrganizationSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//   },
//   { timestamps: true },
// );

// OrganizationSchema.index({ name: 1 }, { unique: true });
