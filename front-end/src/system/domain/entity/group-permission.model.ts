import {Abstract} from "./abstract/abstract.model";
import {Permission} from "./permission.model";
import {Group} from "./group.model";

export class GroupPermission extends Abstract {

  public permission: Permission;

  public group: Group;

}
