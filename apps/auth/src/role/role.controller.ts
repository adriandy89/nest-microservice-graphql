import { RoleService } from './role.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleMsg } from 'libs/common/constants/rabbitmq.constants';
import { handleError } from 'libs/common/utils/error-handler-micro';
import { IMeta } from 'libs/common/interfaces/metadata.interface';
import { CreateRoleInput, UpdateRoleInput } from 'libs/common/dtos/inputs/role';

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern(RoleMsg.CREATE)
  create(@Payload() payload: { roleDTO: CreateRoleInput; meta: IMeta }) {
    return this.roleService
      .create(payload.roleDTO, payload.meta)
      .catch((error) => {
        handleError(
          error.code === 11000
            ? { code: 409, message: 'Duplicate, already exist' }
            : undefined,
        );
      });
  }

  @MessagePattern(RoleMsg.FIND_ALL)
  findAll(@Payload() payload: { meta: IMeta }) {
    return this.roleService.findAll(payload.meta);
  }

  @MessagePattern(RoleMsg.FIND_ONE)
  async findOne(@Payload() payload: { id: string; meta: IMeta }) {
    const found = await this.roleService.findOne(payload.id, payload.meta);
    if (!found) {
      handleError({ code: 404, message: 'Not Found' });
    }
    return found;
  }

  @MessagePattern(RoleMsg.UPDATE)
  update(@Payload() payload: { roleDTO: UpdateRoleInput; meta: IMeta }) {
    return this.roleService.update(payload.roleDTO, payload.meta);
  }

  @MessagePattern(RoleMsg.DELETE)
  delete(@Payload() payload: { id: string; meta: IMeta }) {
    return this.roleService.delete(payload.id, payload.meta);
  }
}
