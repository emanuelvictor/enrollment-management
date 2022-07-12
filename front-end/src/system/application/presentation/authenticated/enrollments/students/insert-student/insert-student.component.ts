import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {StudentRepository} from "../../../../../../domain/repository/student.repository";
import {User} from "../../../../../../domain/entity/user.model";

// @ts-ignore
@Component({
  selector: 'insert-student',
  templateUrl: './insert-student.component.html',
  styleUrls: ['../student.component.scss']
})
export class InsertStudentComponent implements OnInit {

  /**
   *
   */
  user: User;

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
   * @param userRepository
   */
  constructor(private router: Router,
              private homeView: AuthenticatedViewComponent,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private userRepository: StudentRepository) {

    if (!this.activatedRoute.snapshot.params.id) {
      homeView.toolbar.subhead = 'Estudante / Adicionar';
    }

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
  public findById() {
    this.userRepository.findById(this.user.id)
      .subscribe(result => this.user = result)
  }

  /**
   *
   * @param user
   */
  public save(user) {
    this.userRepository.save(user)
      .then(() => {
        this.router.navigate(['students']);
        this.messageService.toastSuccess(`Novo estudante inserido.`, 5)
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
