import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ProxyModule } from '../common/proxy/proxy.module';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [ProxyModule],
  controllers: [UserController],
  providers: [UsersResolver],
})
export class UserModule {}
