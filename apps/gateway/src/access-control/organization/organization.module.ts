import { Module } from '@nestjs/common';
import { ProxyModule } from '../common/proxy/proxy.module';
import { OrganizationResolver } from './organization.resolver';

@Module({
  imports: [ProxyModule],
  controllers: [],
  providers: [OrganizationResolver],
})
export class OrganizationModule {}
