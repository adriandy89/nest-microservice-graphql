import { HttpStatus, Injectable } from '@nestjs/common';
import { OrganizationDTO } from 'libs/common/dtos/organization.dto';
import { OrganizationRepository } from './organization.repository';

@Injectable()
export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async findByOrganizationname(organizationname: string) {
    return await this.organizationRepository.findOne({ organizationname });
  }

  async create(organizationDTO: OrganizationDTO) {
    return await this.organizationRepository.create(organizationDTO);
  }

  async findAll() {
    return await this.organizationRepository.find({});
  }

  async findOne(id: string) {
    return await this.organizationRepository.findOne({ _id: id });
  }

  async update(id: string, organizationDTO: OrganizationDTO) {
    return await this.organizationRepository.findOneAndUpdate(
      { _id: id },
      { $set: organizationDTO },
    );
  }

  async delete(id: string) {
    await this.organizationRepository.findOneAndDelete({ _id: id });
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }
}
