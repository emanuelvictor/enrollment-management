import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticatedViewComponent } from '../../../authenticated-view.component';
import { MessageService } from '../../../../../../domain/services/message.service';
import { StudentRepository } from "../../../../../../domain/repository/student.repository";
import { viewAnimation } from "../../../../../utils/utils";
import { MatDialog } from "@angular/material";
import { EnrollmentRepository } from 'system/domain/repository/enrollment.repository';

// @ts-ignore
@Component({
  selector: 'view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['../student.component.scss'],
  animations: [
    viewAnimation
  ]
})
export class ViewStudentComponent implements OnInit {

  /**
   *
   */
  student: any = {};

  /**
   *
   * @param router
   * @param dialog
   * @param homeView
   * @param activatedRoute
   * @param messageService
   * @param studentRepository
   */
  constructor(private router: Router,
    private dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    public homeView: AuthenticatedViewComponent,
    private studentRepository: StudentRepository,
    private enrollmentRepository: EnrollmentRepository) {
    this.student.id = +this.activatedRoute.snapshot.params.id || null;
    homeView.toolbar.subhead = 'Aluno / Detalhes'
  }

  /**
   *
   */
  ngOnInit() {
    if (this.student && this.student.id) {
      this.findById();
    } else this.router.navigate(["enrollment/students"])
  }

  /**
   *
   */
  public findById() {
    this.studentRepository.findById(this.student.id)
      .subscribe(result => {
        this.student = result;
        this.enrollmentRepository.listByFilters({ 'studentFilter': result.document })
          .subscribe(resul => {
            this.student.enrollments = resul.content
          })
      })
  }

  /**
   *
   */
  public updateEnabled(id: number) {
    this.studentRepository.updateAtivo(id)
      .then((enabled) => {
        this.student.enabled = enabled;
        this.messageService.toastSuccess(this.student.enabled ? 'Ativado com sucesso' : 'Inativado com sucesso')
      })
  }
}
