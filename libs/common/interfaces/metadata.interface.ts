import { Types } from 'mongoose';

export interface IMeta {
  userId?: Types.ObjectId;
  organization?: Types.ObjectId;
}
