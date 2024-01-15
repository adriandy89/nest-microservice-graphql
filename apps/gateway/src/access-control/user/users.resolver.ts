/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserDocument } from 'libs/common/schemas/user.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Permissions } from '../auth/decorators/permission.decorator';
import { PermissionsGuard } from '../auth/guards/permission.guard';
import { GetUserInfo } from '../auth/decorators/get-user-info.decorator';
import { ClientProxyAPI } from '../common/proxy/client-proxy';
import { UserMsg } from 'libs/common/constants/rabbitmq.constants';
import { IMeta } from 'libs/common/interfaces/metadata.interface';
import { IsMongoId } from 'class-validator';
import { ValidIdArgs } from './dto/args/id.arg';
import { catchError, map, of } from 'rxjs';

@Resolver(() => UserDocument)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly clientProxy: ClientProxyAPI) {}
  private clientProxyAccessControl =
    this.clientProxy.clientProxyAccessControl();

  @Permissions({ administration: ['list', 'create', 'update', 'delete'] })
  @UseGuards(PermissionsGuard)
  @Query(() => [UserDocument], { name: 'users' })
  findAll(@GetUserInfo() meta: IMeta) {
    return this.clientProxyAccessControl.send(UserMsg.FIND_ALL, { meta });
  }

  @Permissions({ administration: ['list', 'create', 'update', 'delete'] })
  @UseGuards(PermissionsGuard)
  @Query(() => UserDocument, { name: 'user' })
  findOne(@Args() { id }: ValidIdArgs, @GetUserInfo() meta: IMeta) {
    console.log(id);
    return this.clientProxyAccessControl.send(UserMsg.FIND_ONE, {
      id,
      meta,
    });
  }
}
