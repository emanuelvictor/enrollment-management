import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../application/presentation/login/login.component';
import {InsertPasswordComponent} from '../application/presentation/manage-password/insert-password.component';
import {RecoveryPasswordComponent} from '../application/presentation/manage-password/recovery-password.component';
import {AuthenticatedViewComponent} from "../application/presentation/authenticated/authenticated-view.component";
import {AuthenticationService} from "./services/authentication.service";
import {ConsultStudentsComponent} from "../application/presentation/authenticated/enrollments/students/consult-students/consult-students.component";
import {UserViewComponent} from "../application/presentation/authenticated/enrollments/students/user-view.component";
import {InsertUserComponent} from "../application/presentation/authenticated/enrollments/students/insert-user/insert-user.component";
import {UpdateUserComponent} from "../application/presentation/authenticated/enrollments/students/update-user/update-user.component";
import {EnrollmentsViewComponent} from "../application/presentation/authenticated/enrollments/enrollments-view.component";
import {ViewUserComponent} from "../application/presentation/authenticated/enrollments/students/view-user/view-user.component";
import {GroupsViewComponent} from "../application/presentation/authenticated/enrollments/groups/groups-view.component";
import {InsertGroupComponent} from "../application/presentation/authenticated/enrollments/groups/insert-group/insert-group.component";
import {UpdateGroupComponent} from "../application/presentation/authenticated/enrollments/groups/update-group/update-group.component";
import {ViewGroupComponent} from "../application/presentation/authenticated/enrollments/groups/view-group/view-group.component";
import {ConsultGroupsComponent} from "../application/presentation/authenticated/enrollments/groups/consult-groups/consult-groups.component";
import {ConsultApplicationsComponent} from "../application/presentation/authenticated/enrollments/applications/consult-applications/consult-applications.component";
import {InsertApplicationComponent} from "../application/presentation/authenticated/enrollments/applications/insert-application/insert-application.component";
import {UpdateApplicationComponent} from "../application/presentation/authenticated/enrollments/applications/update-application/update-application.component";
import {ViewApplicationComponent} from "../application/presentation/authenticated/enrollments/applications/view-application/view-application.component";
import {ApplicationViewComponent} from "../application/presentation/authenticated/enrollments/applications/application-view.component";

const routes: Routes = [
  {
    path: '', component: AuthenticatedViewComponent,
    children: [
      {
        path: '',
        component: EnrollmentsViewComponent,
        children: [
          {
            path: '', redirectTo: 'students', pathMatch: 'full',
          },
          {
            path: 'students', component: UserViewComponent,
            // canActivate: [ApplicationViewComponent],
            children: [
              {path: 'get', redirectTo: '', pathMatch: 'full'},
              {path: '', component: ConsultStudentsComponent},
              {path: 'insert', component: InsertUserComponent},
              {path: 'edit/:id', component: UpdateUserComponent},
              {path: ':id/edit', component: UpdateUserComponent},
              {path: ':id', component: ViewUserComponent}
            ]
          },
          {
            path: 'class', component: ApplicationViewComponent,
            // canActivate: [ApplicationViewComponent],
            children: [
              {path: 'get', redirectTo: '', pathMatch: 'full'},
              {path: '', component: ConsultApplicationsComponent},
              {path: 'insert', component: InsertApplicationComponent},
              {path: 'edit/:id', component: UpdateApplicationComponent},
              {path: ':id/edit', component: UpdateApplicationComponent},
              {path: ':id', component: ViewApplicationComponent}
            ]
          },
          {
            path: 'groups', component: GroupsViewComponent,
            children: [
              {path: 'get', redirectTo: '', pathMatch: 'full'},
              {path: '', component: ConsultGroupsComponent},
              {path: 'insert', component: InsertGroupComponent},
              {path: 'edit/:id', component: UpdateGroupComponent},
              {path: ':id/edit', component: UpdateGroupComponent},
              {path: ':id', component: ViewGroupComponent}
            ]
          }
        ]
      }
    ]
  }
];

/**
 *
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: []
})
export class SystemRoutingModule {
}
