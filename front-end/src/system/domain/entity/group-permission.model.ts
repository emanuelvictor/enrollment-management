import {Abstract} from "./abstract/abstract.model";
import {Permission} from "./permission.model";

export class GroupPermission extends Abstract {

  public permission: Permission;

  public group: any;

}
