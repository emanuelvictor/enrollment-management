import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {debounce} from "../../../../../utils/debounce";
import {FormGroup} from "@angular/forms"
import {EnrollmentRepository} from "../../../../../../domain/repository/enrollment.repository";
import {Enrollment} from "../../../../../../domain/entity/enrollment.model";

// @ts-ignore
@Component({
  selector: 'update-enrollment',
  templateUrl: './update-enrollment.component.html',
  styleUrls: ['../enrollment.component.scss']
})
export class UpdateEnrollmentComponent implements OnInit {


  /**
   *
   */
  enrollment: Enrollment = new Enrollment();

  /**
   *
   */
  error: boolean;

  /**
   * Exibir senha
   */
  inputType: string = 'password';

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
              private enrollmentRepository: EnrollmentRepository) {

    homeView.toolbar.subhead = 'Enrollment / Editar';
    this.enrollment.id = +this.activatedRoute.snapshot.params.id;

  }

  /**
   *
   */
  ngOnInit() {
    if (this.enrollment && this.enrollment.id) {
      this.findById();
    }
  }


  /**
   *
   */
  back() {
    if (this.activatedRoute.snapshot.routeConfig.path === 'edit/:id')
      this.router.navigate(['access/enrollments']);
    else
      this.router.navigate(['access/enrollments/' + this.enrollment.id]);
  }

  /**
   *
   */
  public findById() {
    this.enrollmentRepository.findById(this.enrollment.id)
      .subscribe(result => this.enrollment = result);
  }

  /**
   *
   * @param form
   */
  public save(form) {

    if (form.invalid) {
      this.messageService.toastWarning();
      return;
    }

    this.enrollmentRepository.save(this.enrollment)
      .then(() => {
        this.router.navigate(['enrollments/classes']);
        this.messageService.toastSuccess(`Alterado com sucesso`, 5);
      });
  }

  /**
   * Exibir senha
   */
  public showPassword() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  /**
   * Helper
   * @param value
   */
  public isString(value): boolean {
    return typeof value === 'string';
  }

}
