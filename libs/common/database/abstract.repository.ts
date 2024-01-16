import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { CreateIndexesOptions } from 'mongodb';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>) {
    const createdDocument = new this.model({
      _id: new Types.ObjectId(),
      ...document,
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>, populate?: any) {
    let document = undefined;
    if (!populate) {
      document = await this.model.findOne(filterQuery, {}, { lean: true });
    } else {
      document = await this.model
        .findOne(filterQuery, {}, { lean: true })
        .populate(populate)
        .exec();
    }

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      // throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    populate?: any,
  ) {
    let document = undefined;
    if (!populate) {
      document = await this.model.findOneAndUpdate(filterQuery, update, {
        lean: true,
        new: true,
      });
    } else {
      document = await this.model
        .findOneAndUpdate(filterQuery, update, {
          lean: true,
          new: true,
        })
        .populate(populate)
        .exec();
    }
    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>, populate?: any) {
    let documents = undefined;
    if (!populate) {
      documents = await this.model.find(filterQuery, {}, { lean: true });
    } else {
      documents = await this.model
        .find(filterQuery, {}, { lean: true })
        .populate(populate)
        .exec();
    }
    return documents;
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>, populate?: any) {
    // return this.model.findOneAndDelete(filterQuery, { lean: true });
    let document = undefined;
    if (!populate) {
      document = await this.model.findOneAndDelete(filterQuery, { lean: true });
    } else {
      document = await this.model
        .findOneAndDelete(filterQuery, { lean: true })
        .populate(populate)
        .exec();
    }
    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async createIndex(options: CreateIndexesOptions) {
    return this.model.createIndexes(options as any);
  }
}
