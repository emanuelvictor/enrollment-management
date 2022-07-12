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
  user: any = {
    organizacao: {},
    perfis: []
  };

  /**
   *
   */
  itsMe: boolean;
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
   * @param studentRepository
   */
  constructor(private router: Router,
              private homeView: AuthenticatedViewComponent,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private studentRepository: StudentRepository) {

    homeView.toolbar.subhead = 'Usuário / Editar';
    this.user.id = +this.activatedRoute.snapshot.params.id;

  }

  /**
   *
   */
  ngOnInit() {
    if (this.user && this.user.id) {
      this.findById();
      this.itsMe = this.homeView.itsMe(this.user);
    }
  }


  /**
   *
   */
  back() {
    if (this.activatedRoute.snapshot.routeConfig.path === 'edit/:id')
      this.router.navigate(['enrollments/students']);
    else
      this.router.navigate(['enrollments/students/' + this.user.id]);
  }

  /**
   *
   */
  public findById() {
    this.studentRepository.findById(this.user.id)
      .subscribe(result => this.user = result);
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

    this.studentRepository.save(this.user)
      .then(() => {
        this.router.navigate(['students/students']);
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
