import {Injectable} from '@angular/core';
import {BaseRepository} from "../../infrastructure/repository/base/base.repository";
import {HttpClient} from "@angular/common/http";
import {Group} from "../entity/group.model";

@Injectable()
export class GroupRepository extends BaseRepository<Group> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'access-manager/groups');
  }

}
