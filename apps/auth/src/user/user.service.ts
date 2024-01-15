import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDTO } from 'libs/common/dtos/user.dto';
import { IMeta } from 'libs/common/interfaces/metadata.interface';
import { UserRepository } from './user.repository';
import { FilterQuery } from 'mongoose';
import { UserDocument } from 'libs/common/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne(
      { username },
      {
        path: 'role',
      },
    );
  }

  async create(userDTO: UserDTO, meta: IMeta) {
    const hash = await this.hashPassword(userDTO.password);
    return await this.userRepository.create({
      ...userDTO,
      organization: meta.organization ?? userDTO.organization,
      password: hash,
    });
  }

  async findAll(meta: IMeta) {
    return await this.userRepository.find(
      meta.organization ? { organization: meta.organization } : {},
      {
        path: 'role',
      },
    );
  }

  async findOne(id: string, meta: IMeta) {
    const filterQuery: FilterQuery<UserDocument> = { _id: id };
    if (meta.organization) filterQuery.organization = meta.organization;
    return await this.userRepository.findOne(filterQuery, {
      path: 'role',
    });
  }

  async update(id: string, userDTO: UserDTO, meta: IMeta) {
    const filterQuery: FilterQuery<UserDocument> = { _id: id };
    if (meta.organization) filterQuery.organization = meta.organization;
    const user = { ...userDTO };
    if (!!userDTO.password) {
      const hash = await this.hashPassword(userDTO.password);
      user.password = hash;
    }
    return await this.userRepository.findOneAndUpdate(filterQuery, user, {
      path: 'role',
    });
  }

  async delete(id: string, meta: IMeta) {
    const filterQuery: FilterQuery<UserDocument> = { _id: id };
    if (meta.organization) filterQuery.organization = meta.organization;
    return await this.userRepository.findOneAndDelete(filterQuery, {
      path: 'role',
    });
  }
}
