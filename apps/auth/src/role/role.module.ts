import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleDocument, RoleSchema } from 'libs/common/schemas/role.schema';
import { DatabaseModule } from 'libs/common/database';
import { RoleRepository } from './role.repository';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: RoleDocument.name, schema: RoleSchema },
    ]),
    UserModule,
  ],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, UserService],
})
export class RoleModule {}
