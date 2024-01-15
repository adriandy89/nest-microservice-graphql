import { Module } from '@nestjs/common';
import { ProxyModule } from '../common/proxy/proxy.module';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [ProxyModule],
  controllers: [],
  providers: [UsersResolver],
})
export class UserModule {}
