import {Injectable} from '@angular/core';
import {BaseRepository} from "../../infrastructure/repository/base/base.repository";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PageSerialize} from "../../infrastructure/page-serialize/page-serialize";
import {Observable} from "rxjs";
import {User} from "../entity/user.model";

/**
*
*/
@Injectable()
export class StudentRepository extends BaseRepository<User> {

  /**
   *
   * @param httpClient
   */
  constructor(httpClient: HttpClient) {
    super(httpClient, 'v1/peoples'); //TODO must be students
  }

  /**
   *
   * @param pageable
   */
  listByFilters(pageable: any): Observable<any> {

    const params = PageSerialize.getHttpParamsFromPageable(pageable);

    return this.httpClient.get(this.collectionName + "/all", {
      params: params
    })
  }
}