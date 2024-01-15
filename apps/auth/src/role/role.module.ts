import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleDocument, RoleSchema } from 'libs/common/schemas/role.schema';
import { DatabaseModule } from 'libs/common/database';
import { RoleRepository } from './role.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: RoleDocument.name, schema: RoleSchema },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
})
export class RoleModule {}
