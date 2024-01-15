import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractRepository } from 'libs/common/database';
import { OrganizationDocument } from 'libs/common/schemas/organization.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrganizationRepository extends AbstractRepository<OrganizationDocument> {
  protected readonly logger = new Logger(OrganizationRepository.name);

  constructor(
    @InjectModel(OrganizationDocument.name)
    organizationModel: Model<OrganizationDocument>,
  ) {
    super(organizationModel);
  }
}
