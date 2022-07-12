import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {StudentRepository} from "../../../../../../domain/repository/student.repository";
import {viewAnimation} from "../../../../../utils/utils";
import {MatDialog} from "@angular/material";

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
  user: any = {};

  /**
   *
   */
  itsMe: boolean;

  /**
   *
   * @param router
   * @param dialog
   * @param homeView
   * @param activatedRoute
   * @param messageService
   * @param userRepository
   */
  constructor(private router: Router,
              private dialog: MatDialog,
              public activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              public homeView: AuthenticatedViewComponent,
              private userRepository: StudentRepository) {
    this.user.id = +this.activatedRoute.snapshot.params.id || null;
    homeView.toolbar.subhead = 'Estudante / Detalhes'
  }

  /**
   *
   */
  ngOnInit() {
    if (this.user && this.user.id) {
      this.findById();
      this.itsMe = this.homeView.itsMe(this.user)
    } else this.router.navigate(["enrollments/users"])
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
   */
  public updateEnabled(id: number) {
    this.userRepository.updateAtivo(id)
      .then((enabled) => {
        this.user.enabled = enabled;
        this.messageService.toastSuccess(this.user.enabled ? 'Ativado com sucesso' : 'Inativado com sucesso')
      })
  }
}
