import {Component} from '@angular/core';
import {DefaultCanActivate} from "../../../../has-permission/default-can-activate";
import {AuthenticationService} from "../../../../../domain/services/authentication.service";
import {Router} from "@angular/router";

// @ts-ignore
@Component({
  selector: 'student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent extends DefaultCanActivate {

  /**
   *
   * @param authenticationService
   * @param router
   */
  constructor(authenticationService: AuthenticationService, router: Router) {

    super(authenticationService, router);


    this.fallbackRoute = 'access/groups';

    this.permissions = ['root', 'users', 'users/get']

  }
}
