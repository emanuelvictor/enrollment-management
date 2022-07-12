import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../application/presentation/login/login.component';
import {InsertPasswordComponent} from '../application/presentation/manage-password/insert-password.component';
import {RecoveryPasswordComponent} from '../application/presentation/manage-password/recovery-password.component';
import {AuthenticatedViewComponent} from "../application/presentation/authenticated/authenticated-view.component";
import {AuthenticationService} from "./services/authentication.service";
import {ConsultStudentsComponent} from "../application/presentation/authenticated/enrollments/students/consult-students/consult-students.component";
import {StudentViewComponent} from "../application/presentation/authenticated/enrollments/students/student-view.component";
import {InsertStudentComponent} from "../application/presentation/authenticated/enrollments/students/insert-student/insert-student.component";
import {UpdateStudentComponent} from "../application/presentation/authenticated/enrollments/students/update-student/update-student.component";
import {EnrollmentsViewComponent} from "../application/presentation/authenticated/enrollments/enrollments-view.component";
import {ViewStudentComponent} from "../application/presentation/authenticated/enrollments/students/view-student/view-student.component";
import {ClassesViewComponent} from "../application/presentation/authenticated/enrollments/classes/classes-view.component";
import {InsertClassComponent} from "../application/presentation/authenticated/enrollments/classes/insert-class/insert-class.component";
import {UpdateClassComponent} from "../application/presentation/authenticated/enrollments/classes/update-class/update-class.component";
import {ViewClassComponent} from "../application/presentation/authenticated/enrollments/classes/view-class/view-class.component";
import {ConsultClassesComponent} from "../application/presentation/authenticated/enrollments/classes/consult-classes/consult-classes.component";
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
        path: 'enrollments',
        component: EnrollmentsViewComponent,
        children: [
          {
            path: '', redirectTo: 'students', pathMatch: 'full',
          },
          {
            path: 'students', component: StudentViewComponent,
            // canActivate: [ApplicationViewComponent],
            children: [
              {path: 'get', redirectTo: '', pathMatch: 'full'},
              {path: '', component: ConsultStudentsComponent},
              {path: 'insert', component: InsertStudentComponent},
              {path: 'edit/:id', component: UpdateStudentComponent},
              {path: ':id/edit', component: UpdateStudentComponent},
              {path: ':id', component: ViewStudentComponent}
            ]
          },
          {
            path: 'classes', component: ApplicationViewComponent,
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
            path: 'enrollments', component: ClassesViewComponent,
            children: [
              {path: 'get', redirectTo: '', pathMatch: 'full'},
              {path: '', component: ConsultClassesComponent},
              {path: 'insert', component: InsertClassComponent},
              {path: 'edit/:id', component: UpdateClassComponent},
              {path: ':id/edit', component: UpdateClassComponent},
              {path: ':id', component: ViewClassComponent}
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
