import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticatedViewComponent} from "../application/presentation/authenticated/authenticated-view.component";
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
import {ConsultEnrollmentsComponent} from "../application/presentation/authenticated/enrollments/enrollments/consult-enrollments/consult-enrollments.component";
import {InsertEnrollmentComponent} from "../application/presentation/authenticated/enrollments/enrollments/insert-enrollment/insert-enrollment.component";
import {UpdateEnrollmentComponent} from "../application/presentation/authenticated/enrollments/enrollments/update-enrollment/update-enrollment.component";
import {ViewEnrollmentComponent} from "../application/presentation/authenticated/enrollments/enrollments/view-enrollment/view-enrollment.component";
import {EnrollmentViewComponent} from "../application/presentation/authenticated/enrollments/enrollments/enrollment-view.component";

const routes: Routes = [
  {
    path: '', component: AuthenticatedViewComponent,
    children: [
      {
        path: '', redirectTo: 'enrollment', pathMatch: 'full',
      },
      {
        path: 'enrollment',
        component: EnrollmentsViewComponent,
        children: [
          {
            path: '', redirectTo: 'enrollments', pathMatch: 'full',
          },
          {
            path: 'enrollments', component: EnrollmentViewComponent,
            children: [
              {path: 'get', redirectTo: '', pathMatch: 'full'},
              {path: '', component: ConsultEnrollmentsComponent},
              {path: 'insert', component: InsertEnrollmentComponent},
              {path: 'edit/:id', component: UpdateEnrollmentComponent},
              {path: ':id/edit', component: UpdateEnrollmentComponent},
              {path: ':id', component: ViewEnrollmentComponent}
            ]
          },
          {
            path: 'classes', component: ClassesViewComponent,
            children: [
              {path: 'get', redirectTo: '', pathMatch: 'full'},
              {path: '', component: ConsultClassesComponent},
              {path: 'insert', component: InsertClassComponent},
              {path: 'edit/:id', component: UpdateClassComponent},
              {path: ':id/edit', component: UpdateClassComponent},
              {path: ':id', component: ViewClassComponent}
            ]
          },
          {
            path: 'students', component: StudentViewComponent,
            children: [
              {path: 'get', redirectTo: '', pathMatch: 'full'},
              {path: '', component: ConsultStudentsComponent},
              {path: 'insert', component: InsertStudentComponent},
              {path: 'edit/:id', component: UpdateStudentComponent},
              {path: ':id/edit', component: UpdateStudentComponent},
              {path: ':id', component: ViewStudentComponent}
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
