import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from './organization.repository';
import {
  CreateOrganizationInput,
  UpdateOrganizationInput,
} from 'libs/common/dtos/inputs/organization';
import { OrganizationDocument } from 'libs/common/schemas/organization.schema';
import { FilterQuery } from 'mongoose';

@Injectable()
export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async create(organizationDTO: CreateOrganizationInput) {
    return await this.organizationRepository.create(organizationDTO);
  }

  async findAll() {
    return await this.organizationRepository.find({});
  }

  async findOne(_id: string) {
    const filterQuery: FilterQuery<OrganizationDocument> = { _id };
    return await this.organizationRepository.findOne(filterQuery);
  }

  async update({ _id, ...organizationDTO }: UpdateOrganizationInput) {
    const filterQuery: FilterQuery<OrganizationDocument> = { _id };
    return await this.organizationRepository.findOneAndUpdate(
      filterQuery,
      organizationDTO,
    );
  }

  async delete(_id: string) {
    const filterQuery: FilterQuery<OrganizationDocument> = { _id };
    return await this.organizationRepository.findOneAndDelete(filterQuery);
  }
}
