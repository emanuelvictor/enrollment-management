import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {EnrollmentRepository} from "../../../../../../domain/repository/enrollment.repository";
import {Enrollment} from "../../../../../../domain/entity/enrollment.model";

// @ts-ignore
@Component({
  selector: 'insert-enrollment',
  templateUrl: './insert-enrollment.component.html',
  styleUrls: ['../enrollment.component.scss']
})
export class InsertEnrollmentComponent implements OnInit {

  /**
   *
   */
  enrollment: Enrollment;

  /**
   *
   */
  itsMe: boolean;

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
   * @param enrollmentRepository
   */
  constructor(private router: Router,
              private homeView: AuthenticatedViewComponent,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private enrollmentRepository: EnrollmentRepository,) {
    if (!this.activatedRoute.snapshot.params.id) {
      homeView.toolbar.subhead = 'Turma / Adicionar'
    }
  }

  /**
   *
   */
  ngOnInit() {
    if (this.enrollment && this.enrollment.id) {
      this.findById()
    }
  }

  /**
   *
   */
  public findById() {
    this.enrollmentRepository.findById(this.enrollment.id)
      .subscribe(result => this.enrollment = result)
  }

  /**
   *
   * @param enrollment
   */
  public save(enrollment) {
    this.enrollmentRepository.save(enrollment)
      .then(() => {
        this.router.navigate(['enrollments/classes']);
        this.messageService.toastSuccess(`Insetrido com sucesso.`, 5)
      })
  }

  /**
   * Helper
   * @param value
   */
  public isString(value): boolean {
    return typeof value === 'string'
  }

}
