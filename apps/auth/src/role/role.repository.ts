import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractRepository } from 'libs/common/database';
import { RoleDocument } from 'libs/common/schemas/role.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoleRepository extends AbstractRepository<RoleDocument> {
  protected readonly logger = new Logger(RoleRepository.name);

  constructor(
    @InjectModel(RoleDocument.name)
    roleModel: Model<RoleDocument>,
  ) {
    super(roleModel);
  }
}
