import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticatedViewComponent } from '../../../authenticated-view.component';
import { MessageService } from '../../../../../../domain/services/message.service';
import { debounce } from "../../../../../utils/debounce";
import { FormGroup } from "@angular/forms"
import { StudentRepository } from "../../../../../../domain/repository/student.repository";
import { EnrollmentRepository } from 'system/domain/repository/enrollment.repository';
import { People } from 'system/domain/entity/people.model';

// @ts-ignore
@Component({
  selector: 'update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['../student.component.scss']
})
export class UpdateStudentComponent implements OnInit {

  /**
   *
   */
  student: any = {};

  /**
   *
   */
  error: boolean;

  /**
   *
   * @param router
   * @param homeView
   * @param activatedRoute
   * @param messageService
   * @param studentRepository
   */
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private homeView: AuthenticatedViewComponent,
    private studentRepository: StudentRepository,
    private enrollmentRepository: EnrollmentRepository) {

    homeView.toolbar.subhead = 'Aluno / Editar'

  }

  /**
   *
   */
  ngOnInit() {
    this.findById();
  }


  /**
   *
   */
  back() {
    if (this.activatedRoute.snapshot.routeConfig.path === 'edit/:id')
      this.router.navigate(['enrollment/students']);
    else
      this.router.navigate(['enrollment/students/' + this.student.id]);
  }

  /**
   *
   */
  public findById() {
    this.studentRepository.findById(this.activatedRoute.snapshot.params.id)
      .subscribe(result => {
        this.student = result;
        this.enrollmentRepository.listByFilters({ 'studentFilter': result.document }).subscribe(resutl => {
          this.student.enrollments = resutl.content;
        })
      });
  }

  /**
   * 
   * @param student 
   */
  public save(student: People) {
    this.studentRepository.save(student)
      .then(() => {
        this.enrollmentRepository.saveAll(student.enrollments)
          .then(() => {
            this.router.navigate(['enrollment/students']);
            this.messageService.toastSuccess(`Alterado com sucesso`, 5)
          })
      })
    this.enrollmentRepository.deleteAll(student.enrollmentsToRemove)
  }

  /**
   * Helper
   * @param value
   */
  public isString(value): boolean {
    return typeof value === 'string'
  }
}