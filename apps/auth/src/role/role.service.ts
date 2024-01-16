import { Injectable } from '@nestjs/common';
import { IMeta } from 'libs/common/interfaces/metadata.interface';
import { RoleRepository } from './role.repository';
import { RoleDocument } from 'libs/common/schemas/role.schema';
import { FilterQuery } from 'mongoose';
import { UpdateRoleInput } from 'libs/common/dtos/inputs/role';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

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

  async findOne(id: string, meta: IMeta) {
    const filterQuery: FilterQuery<RoleDocument> = { _id: id };
    if (meta.organization) filterQuery.organization = meta.organization;
    return await this.roleRepository.findOne(filterQuery);
  }

  async update({ _id, ...roleDTO }: UpdateRoleInput, meta: IMeta) {
    const filterQuery: FilterQuery<RoleDocument> = { _id };
    if (meta.organization) filterQuery.organization = meta.organization;
    return await this.roleRepository.findOneAndUpdate(filterQuery, roleDTO);
  }

  async delete(id: string, meta: IMeta) {
    const filterQuery: FilterQuery<RoleDocument> = { _id: id };
    if (meta.organization) filterQuery.organization = meta.organization;
    return await this.roleRepository.findOneAndDelete(filterQuery);
  }
}
