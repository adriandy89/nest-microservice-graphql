import { IPermission } from 'libs/common/interfaces/permission.interface';
import { SetMetadata } from '@nestjs/common';
export const Permissions = (permissions: Partial<IPermission>) =>
  SetMetadata('permissions', permissions);
