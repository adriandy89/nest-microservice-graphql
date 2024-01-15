import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IMeta } from 'libs/common/interfaces/metadata.interface';
import { UserRepository } from './user.repository';
import { FilterQuery } from 'mongoose';
import { UserDocument } from 'libs/common/schemas/user.schema';
import { CreateUserInput, UpdateUserInput } from 'libs/common/dtos/user/inputs';

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

  async create(userDTO: CreateUserInput, meta: IMeta) {
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

  async findOne(_id: string, meta: IMeta) {
    const filterQuery: FilterQuery<UserDocument> = { _id };
    if (meta.organization) filterQuery.organization = meta.organization;
    return await this.userRepository.findOne(filterQuery, {
      path: 'role',
    });
  }

  async update({ _id, ...userDTO }: UpdateUserInput, meta: IMeta) {
    const filterQuery: FilterQuery<UserDocument> = { _id };
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

  async delete(_id: string, meta: IMeta) {
    const filterQuery: FilterQuery<UserDocument> = { _id };
    if (meta.organization) filterQuery.organization = meta.organization;
    return await this.userRepository.findOneAndDelete(filterQuery, {
      path: 'role',
    });
  }
}
