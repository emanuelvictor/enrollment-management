import {Injectable} from '@angular/core';
import {BaseRepository} from "../../infrastructure/repository/base/base.repository";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Enrollment} from "../entity/enrollment.model";

@Injectable()
export class EnrollmentRepository extends BaseRepository<Enrollment> {

  /**
   *
   * @param httpClient
   */
  constructor(httpClient: HttpClient) {
    super(httpClient, 'v1/enrollments');
  }
}
