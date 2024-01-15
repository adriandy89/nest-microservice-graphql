import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import {
  OrganizationDocument,
  OrganizationSchema,
} from 'libs/common/schemas/organization.schema';
import { DatabaseModule } from 'libs/common/database';
import { OrganizationRepository } from './organization.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: OrganizationDocument.name, schema: OrganizationSchema },
    ]),
  ],
  controllers: [OrganizationController, OrganizationRepository],
  providers: [OrganizationService, OrganizationRepository],
  exports: [OrganizationService, OrganizationRepository],
})
export class OrganizationModule {}
