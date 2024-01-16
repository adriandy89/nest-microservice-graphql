import { UseGuards } from '@nestjs/common';
import { ClientProxyAPI } from '../common/proxy/client-proxy';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrganizationMsg } from 'libs/common/constants/rabbitmq.constants';
import { SAdminGuard } from '../auth/guards/sadmin.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrganizationDocument } from 'libs/common/schemas/organization.schema';
import { ValidIdArgs } from 'libs/common/dtos/args';
import {
  CreateOrganizationInput,
  UpdateOrganizationInput,
} from 'libs/common/dtos/inputs/organization';

@Resolver(() => OrganizationDocument)
@UseGuards(JwtAuthGuard)
export class OrganizationResolver {
  constructor(private readonly clientProxy: ClientProxyAPI) {}
  private clientProxyAccessControl =
    this.clientProxy.clientProxyAccessControl();

  @UseGuards(SAdminGuard)
  @Mutation(() => OrganizationDocument, { name: 'createOrganization' })
  create(
    @Args('createOrganizationInput') organizationDTO: CreateOrganizationInput,
  ) {
    return this.clientProxyAccessControl.send(
      OrganizationMsg.CREATE,
      organizationDTO,
    );
  }

  @UseGuards(SAdminGuard)
  @Query(() => [OrganizationDocument], { name: 'organizations' })
  findAll() {
    return this.clientProxyAccessControl.send(OrganizationMsg.FIND_ALL, '');
  }

  @UseGuards(SAdminGuard)
  @Query(() => OrganizationDocument, { name: 'organization' })
  findOne(@Args() { id }: ValidIdArgs) {
    return this.clientProxyAccessControl.send(OrganizationMsg.FIND_ONE, id);
  }

  @UseGuards(SAdminGuard)
  @Mutation(() => OrganizationDocument, { name: 'updateOrganization' })
  update(
    @Args('updateOrganizationInput') organizationDTO: UpdateOrganizationInput,
  ) {
    return this.clientProxyAccessControl.send(
      OrganizationMsg.UPDATE,
      organizationDTO,
    );
  }

  @UseGuards(SAdminGuard)
  @Mutation(() => OrganizationDocument, { name: 'deleteOrganization' })
  delete(@Args() { id }: ValidIdArgs) {
    return this.clientProxyAccessControl.send(OrganizationMsg.DELETE, id);
  }
}
