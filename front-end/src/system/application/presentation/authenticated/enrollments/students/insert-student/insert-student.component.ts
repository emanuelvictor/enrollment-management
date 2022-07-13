import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {StudentRepository} from "../../../../../../domain/repository/student.repository";
import {People} from "../../../../../../domain/entity/people.model";

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
  student: People;

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

    if (!this.activatedRoute.snapshot.params.id) {
      homeView.toolbar.subhead = 'Aluno / Adicionar';
    }

  }

  /**
   *
   */
  ngOnInit() {
    if (this.student && this.student.id) {
      this.findById()
    }
  }

  /**
   *
   */
  public findById() {
    this.studentRepository.findById(this.student.id)
      .subscribe(result => this.student = result)
  }

  /**
   *
   * @param student
   */
  public save(student) {
    this.studentRepository.save(student)
      .then(() => {
        this.router.navigate(['students']);
        this.messageService.toastSuccess(`Novo aluno inserido.`, 5)
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
