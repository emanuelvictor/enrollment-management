import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {debounce} from "../../../../../utils/debounce";
import {FormGroup} from "@angular/forms"
import {StudentRepository} from "../../../../../../domain/repository/student.repository";

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
              private homeView: AuthenticatedViewComponent,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private studentRepository: StudentRepository) {

    homeView.toolbar.subhead = 'Aluno / Editar';
    this.student.id = +this.activatedRoute.snapshot.params.id;

  }

  /**
   *
   */
  ngOnInit() {
    if (this.student && this.student.id) {
      this.findById();
    }
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
    this.studentRepository.findById(this.student.id)
      .subscribe(result => this.student = result);
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

    this.studentRepository.save(this.student)
      .then(() => {
        this.router.navigate(['enrollment/students']);
        this.messageService.toastSuccess(`Alterado com sucesso`, 5);
      });
  }

  /**
   * Helper
   * @param value
   */
  public isString(value): boolean {
    return typeof value === 'string';
  }

}
