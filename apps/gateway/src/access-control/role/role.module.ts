import { Module } from '@nestjs/common';
import { ProxyModule } from '../common/proxy/proxy.module';
import { RolesResolver } from './role.resolver';

@Module({
  imports: [ProxyModule],
  controllers: [],
  providers: [RolesResolver],
})
export class RoleModule {}
