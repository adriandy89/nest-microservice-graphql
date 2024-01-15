import { UserService } from './user.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMsg } from 'libs/common/constants/rabbitmq.constants';
import { handleError } from 'libs/common/utils/error-handler-micro';
import { IMeta } from 'libs/common/interfaces/metadata.interface';
import { CreateUserInput, UpdateUserInput } from 'libs/common/dtos/user/inputs';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMsg.CREATE)
  create(@Payload() payload: { userDTO: CreateUserInput; meta: IMeta }) {
    return this.userService
      .create(payload.userDTO, payload.meta)
      .catch((error) => {
        handleError(
          error.code === 11000
            ? { code: 409, message: 'Duplicate, already exist' }
            : undefined,
        );
      });
  }

  @MessagePattern(UserMsg.FIND_ALL)
  findAll(@Payload() payload: { meta: IMeta }) {
    return this.userService.findAll(payload.meta);
  }

  @MessagePattern(UserMsg.FIND_ONE)
  async findOne(@Payload() payload: { id: string; meta: IMeta }) {
    const found = await this.userService.findOne(payload.id, payload.meta);
    if (!found) {
      handleError({ code: 404, message: 'Not Found' });
    }
    return found;
  }
  @MessagePattern(UserMsg.UPDATE)
  update(@Payload() payload: { userDTO: UpdateUserInput; meta: IMeta }) {
    return this.userService.update(payload.userDTO, payload.meta);
  }

  @MessagePattern(UserMsg.DELETE)
  delete(@Payload() payload: { id: string; meta: IMeta }) {
    return this.userService.delete(payload.id, payload.meta);
  }

  @MessagePattern(UserMsg.VALID_USER)
  async validateUser(@Payload() payload) {
    const user = await this.userService.findByUsername(payload.username);
    if (!user || !user.active) return null;

    const isValidPassword = await this.userService.checkPassword(
      payload.password,
      user.password,
    );

    if (isValidPassword) return user;

    return null;
  }

  @MessagePattern(UserMsg.VALID_TOKEN)
  async validateTokenInfo(@Payload() payload) {
    const user = await this.userService.findOne(payload.userId, {});
    if (!user || !user.active) return null;
    return user;
  }
}
