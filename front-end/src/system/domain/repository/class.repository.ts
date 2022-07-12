import {Injectable} from '@angular/core';
import {BaseRepository} from "../../infrastructure/repository/base/base.repository";
import {HttpClient} from "@angular/common/http";
import {Class} from "../entity/class.model";

@Injectable()
export class ClassRepository extends BaseRepository<Class> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'classes');
  }

}
