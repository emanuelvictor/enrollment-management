import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {EnrollmentRepository} from "../../../../../../domain/repository/enrollment.repository";
import {viewAnimation} from "../../../../../utils/utils";
import {MatDialog} from "@angular/material";
import {Enrollment} from "../../../../../../domain/entity/enrollment.model";

// @ts-ignore
@Component({
  selector: 'view-enrollment',
  templateUrl: './view-enrollment.component.html',
  styleUrls: ['../enrollment.component.scss'],
  animations: [
    viewAnimation
  ]
})
export class ViewEnrollmentComponent implements OnInit {

  /**
   *
   */
  enrollment: Enrollment = new Enrollment();

  /**
   *
   * @param router
   * @param dialog
   * @param homeView
   * @param activatedRoute
   * @param messageService
   * @param enrollmentRepository
   */
  constructor(private router: Router,
              private dialog: MatDialog,
              public activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              public homeView: AuthenticatedViewComponent,
              private enrollmentRepository: EnrollmentRepository) {
    this.enrollment.id = +this.activatedRoute.snapshot.params.id || null;
    homeView.toolbar.subhead = 'Matrícula / Detalhes'
  }

  /**
   *
   */
  ngOnInit() {
    if (this.enrollment && this.enrollment.id) {
      this.findById();
    } else this.router.navigate(["access/enrollments"])
  }

  /**
   *
   */
  public findById() {
    this.enrollmentRepository.findById(this.enrollment.id)
      .subscribe(result => this.enrollment = result)
  }
}
