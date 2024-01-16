import { registerEnumType } from '@nestjs/graphql';

export type Permissions = 'list' | 'create' | 'update' | 'delete' | 'admin';

export enum PermissionsEnum {
  LIST = 'list',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  ADMIN = 'admin',
}

registerEnumType(PermissionsEnum, {
  name: 'ValidRoles',
  description: 'Valid permissions select',
});
