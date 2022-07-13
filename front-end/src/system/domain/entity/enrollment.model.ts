import {Class} from "./class.model";
import {People} from "./people.model";
import {Abstract} from "./abstract/abstract.model";

export class Enrollment extends Abstract {

  /**
   *
   */
  public student: People;

  /**
   *
   */
  public class: Class;

}
