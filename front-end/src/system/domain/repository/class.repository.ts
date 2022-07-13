import {Injectable} from '@angular/core';
import {BaseRepository} from "../../infrastructure/repository/base/base.repository";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageSerialize} from "../../infrastructure/page-serialize/page-serialize";
import {Class} from "../entity/class.model";

/**
*
*/
@Injectable()
export class ClassRepository extends BaseRepository<Class> {

  /**
   *
   * @param httpClient
   */
  constructor(httpClient: HttpClient) {
    super(httpClient, 'v1/classes')
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
