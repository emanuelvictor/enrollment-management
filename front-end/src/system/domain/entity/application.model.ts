import {People} from './people.model';
import {ClientDetails} from "../../infrastructure/authentication/client-details";

export class Application extends People implements ClientDetails {

  /**
   *
   */
  public clientId: string;

  /**
   *
   */
  public password: string;

  /**
   *
   */
  public clientSecret: string;

  /**
   *
   */
  public enabled: boolean = true;

  /**
   *
   */
  public group: any;

  /**
   *
   */
  public authorities: any;

  /**
   *
   */
  constructor(id?: number) {
    super();
    this.id = id;
  }

}
