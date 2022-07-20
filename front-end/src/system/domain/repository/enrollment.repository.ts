import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { PageSerialize } from "system/infrastructure/page-serialize/page-serialize";
import { BaseRepository } from "../../infrastructure/repository/base/base.repository";
import { Enrollment } from "../entity/enrollment.model";

@Injectable()
export class EnrollmentRepository extends BaseRepository<Enrollment> {

  /**
   *
   * @param httpClient
   */
  constructor(httpClient: HttpClient) {
    super(httpClient, 'v1/enrollments');
  }

  /**
   * 
   * @param enrollments 
   * @returns 
   */
  saveAll(enrollments: Enrollment[]): Promise<Enrollment[]> {
    const that = this;
    return new Promise(function (resolve, reject) {
      enrollments.forEach(async (enrollment) => {
        await that.save(enrollment).then(result =>  enrollment = result)
      })

      resolve(enrollments)
    })
  }
}
