import { Permissions } from '../enums';

export interface IPermission {
  administration: Permissions[];
  products: Permissions[];
}
