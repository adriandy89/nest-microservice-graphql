import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Permissions } from '../auth/decorators/permission.decorator';
import { PermissionsGuard } from '../auth/guards/permission.guard';
import { GetUserInfo } from '../auth/decorators/get-user-info.decorator';
import { ClientProxyAPI } from '../common/proxy/client-proxy';
import { RoleMsg } from 'libs/common/constants/rabbitmq.constants';
import { IMeta } from 'libs/common/interfaces/metadata.interface';
import { ValidIdArgs } from 'libs/common/dtos/args';
import { RoleDocument } from 'libs/common/schemas/role.schema';
import { CreateRoleInput } from 'libs/common/dtos/inputs/role/create-role.input';
import { UpdateRoleInput } from 'libs/common/dtos/inputs/role/update-role.input';

@Resolver(() => RoleDocument)
@UseGuards(JwtAuthGuard)
export class RolesResolver {
  constructor(private readonly clientProxy: ClientProxyAPI) {}
  private clientProxyAccessControl =
    this.clientProxy.clientProxyAccessControl();

  @Permissions({ administration: ['list', 'create', 'update', 'delete'] })
  @UseGuards(PermissionsGuard)
  @Query(() => [RoleDocument], { name: 'roles' })
  findAll(@GetUserInfo() meta: IMeta) {
    return this.clientProxyAccessControl.send(RoleMsg.FIND_ALL, { meta });
  }

  @Permissions({ administration: ['list', 'create', 'update', 'delete'] })
  @UseGuards(PermissionsGuard)
  @Query(() => RoleDocument, { name: 'role' })
  findOne(@Args() { id }: ValidIdArgs, @GetUserInfo() meta: IMeta) {
    return this.clientProxyAccessControl.send(RoleMsg.FIND_ONE, {
      id,
      meta,
    });
  }

  @Permissions({ administration: ['list', 'create', 'update', 'delete'] })
  @UseGuards(PermissionsGuard)
  @Mutation(() => RoleDocument, { name: 'createRole' })
  async create(
    @Args('createRoleInput') roleDTO: CreateRoleInput,
    @GetUserInfo() meta: IMeta,
  ) {
    if (!roleDTO.organization && !meta.organization)
      throw new BadRequestException('organization required');
    return this.clientProxyAccessControl.send(RoleMsg.CREATE, {
      roleDTO,
      meta,
    });
  }

  @Permissions({ administration: ['list', 'create', 'update', 'delete'] })
  @UseGuards(PermissionsGuard)
  @Mutation(() => RoleDocument, { name: 'updateRole' })
  async update(
    @Args('updateRoleInput') roleDTO: UpdateRoleInput,
    @GetUserInfo() meta: IMeta,
  ) {
    return this.clientProxyAccessControl.send(RoleMsg.UPDATE, {
      roleDTO,
      meta,
    });
  }

  @Permissions({ administration: ['list', 'create', 'update', 'delete'] })
  @UseGuards(PermissionsGuard)
  @Mutation(() => RoleDocument, { name: 'deleteRole' })
  delete(@Args() { id }: ValidIdArgs, @GetUserInfo() meta: IMeta) {
    return this.clientProxyAccessControl.send(RoleMsg.DELETE, { id, meta });
  }
}
