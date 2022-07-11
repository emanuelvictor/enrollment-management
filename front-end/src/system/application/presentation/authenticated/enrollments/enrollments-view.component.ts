import {Component} from '@angular/core';
import {DefaultCanActivate} from "../../../has-permission/default-can-activate";
import {AuthenticationService} from "../../../../domain/services/authentication.service";
import {Router} from "@angular/router";

// @ts-ignore
@Component({
  selector: 'enrollments-view',
  templateUrl: './enrollments-view.component.html',
  styleUrls: ['./enrollments-view.component.scss']
})
export class EnrollmentsViewComponent extends DefaultCanActivate {

  /**
   *
   * @param authenticationService
   * @param router
   */
  constructor(authenticationService: AuthenticationService, router: Router) {

    super(authenticationService, router);

    this.fallbackRoute = 'minha-conta';

    this.permissions = ['root', 'students', 'students/get', 'groups', 'groups/get']

  }
}
