import {Abstract} from "./abstract/abstract.model";

export class Permission extends Abstract {

  /**
   *
   */
  public name: string;

  /**
   *
   */
  private identifier: string;

  /**
   *
   */
  public upperPermission: number;

  /**
   *
   */
  public lowerPermissions: Permission[]

}