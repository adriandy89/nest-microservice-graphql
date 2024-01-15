import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrganizationModule } from './organization/organization.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'libs/common/database';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OrganizationModule,
    RoleModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
