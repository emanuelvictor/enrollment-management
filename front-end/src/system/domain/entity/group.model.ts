import {Abstract} from "./abstract/abstract.model";
import {GroupPermission} from "./group-permission.model";

export class Group extends Abstract {

  /**
   *
   */
  public name: string;

  /**
   *
   */
  public enable: boolean;

  /**
   *
   */
  public groupPermissions: GroupPermission[];


}
