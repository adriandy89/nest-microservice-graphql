import { Injectable } from '@nestjs/common';
import { IMeta } from 'libs/common/interfaces/metadata.interface';
import { RoleRepository } from './role.repository';
import { RoleDocument } from 'libs/common/schemas/role.schema';
import { FilterQuery } from 'mongoose';
import { UpdateRoleInput } from 'libs/common/dtos/inputs/role';
import { UserService } from '../user/user.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RoleService {
  constructor(
    private roleRepository: RoleRepository,
    private userService: UserService,
  ) {}

  async create(roleDTO: any, meta: IMeta) {
    return await this.roleRepository.create({
      ...roleDTO,
      organization: meta.organization ?? roleDTO.organization,
    });
  }

  async findAll(meta: IMeta) {
    return await this.roleRepository.find(
      meta.organization ? { organization: meta.organization } : {},
    );
  }

  async findOne(_id: string, meta: IMeta) {
    const filterQuery: FilterQuery<RoleDocument> = { _id };
    if (meta.organization) filterQuery.organization = meta.organization;
    return await this.roleRepository.findOne(filterQuery);
  }

  async update({ _id, ...roleDTO }: UpdateRoleInput, meta: IMeta) {
    const filterQuery: FilterQuery<RoleDocument> = { _id };
    if (meta.organization) filterQuery.organization = meta.organization;
    return await this.roleRepository.findOneAndUpdate(filterQuery, roleDTO);
  }

  async delete(_id: string, meta: IMeta) {
    const existUserWithRole = await this.userService.findOneByQuery({
      role: {
        $in: [_id],
      },
    });
    if (existUserWithRole) throw new RpcException('Role in use');
    const filterQuery: FilterQuery<RoleDocument> = { _id };
    if (meta.organization) filterQuery.organization = meta.organization;
    return await this.roleRepository.findOneAndDelete(filterQuery);
  }
}
