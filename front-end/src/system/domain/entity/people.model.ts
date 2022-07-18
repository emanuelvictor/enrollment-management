import {Abstract} from './abstract/abstract.model';
import { Enrollment } from './enrollment.model';

export class People extends Abstract {

  /**
   *
   */
  public name: string;

  /**
   *
   */
  public document: string;

  /**
   *
   */
  public enrollments: Enrollment[] = [];

}
