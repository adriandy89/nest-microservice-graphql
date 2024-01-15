import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDocument } from 'libs/common/schemas/user.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  BadRequestException,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { Permissions } from '../auth/decorators/permission.decorator';
import { PermissionsGuard } from '../auth/guards/permission.guard';
import { GetUserInfo } from '../auth/decorators/get-user-info.decorator';
import { ClientProxyAPI } from '../common/proxy/client-proxy';
import { UserMsg } from 'libs/common/constants/rabbitmq.constants';
import { IMeta } from 'libs/common/interfaces/metadata.interface';
import { CreateUserInput, UpdateUserInput } from 'libs/common/dtos/user/inputs';
import { ValidIdArgs } from 'libs/common/dtos/args';

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
    return this.clientProxyAccessControl.send(UserMsg.FIND_ONE, {
      id,
      meta,
    });
  }

  @Permissions({ administration: ['list', 'create', 'update', 'delete'] })
  @UseGuards(PermissionsGuard)
  @Mutation(() => UserDocument, { name: 'createUser' })
  async create(
    @Args('createUserInput') userDTO: CreateUserInput,
    @GetUserInfo() meta: IMeta,
  ) {
    if (userDTO.username == 'sadmin')
      throw new ConflictException('Duplicate, already exist');
    if (!userDTO.organization && !meta.organization)
      throw new BadRequestException('organization required');
    return this.clientProxyAccessControl.send(UserMsg.CREATE, {
      userDTO,
      meta,
    });
  }

  @Permissions({ administration: ['list', 'create', 'update', 'delete'] })
  @UseGuards(PermissionsGuard)
  @Mutation(() => UserDocument, { name: 'updateUser' })
  async update(
    @Args('updateUserInput') userDTO: UpdateUserInput,
    @GetUserInfo() meta: IMeta,
  ) {
    return this.clientProxyAccessControl.send(UserMsg.UPDATE, {
      userDTO,
      meta,
    });
  }

  @Permissions({ administration: ['list', 'create', 'update', 'delete'] })
  @UseGuards(PermissionsGuard)
  @Mutation(() => UserDocument, { name: 'deleteUser' })
  delete(@Args() { id }: ValidIdArgs, @GetUserInfo() meta: IMeta) {
    return this.clientProxyAccessControl.send(UserMsg.DELETE, { id, meta });
  }
}
