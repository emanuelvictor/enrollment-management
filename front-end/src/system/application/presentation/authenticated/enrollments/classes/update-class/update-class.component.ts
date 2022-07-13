import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {ClassRepository} from "../../../../../../domain/repository/class.repository";
import {Class} from "../../../../../../domain/entity/class.model";

// @ts-ignore
@Component({
  selector: 'update-class',
  templateUrl: 'update-class.component.html',
  styleUrls: ['../classes.component.scss']
})
export class UpdateClassComponent implements OnInit {


  /**
   *
   */
  class: Class = new Class();

  /**
   *
   * @param router
   * @param homeView
   * @param activatedRoute
   * @param messageService
   * @param classRepository
   */
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private homeView: AuthenticatedViewComponent,
              private classRepository: ClassRepository) {
    homeView.toolbar.subhead = 'Turma / Editar';
  }

  /**
   *
   */
  back() {
    if (this.activatedRoute.snapshot.routeConfig.path === 'edit/:id')
      this.router.navigate(['enrollment/classes']);
    else
      this.router.navigate(['enrollment/classes/' + (+this.activatedRoute.snapshot.params.id)]);
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
  public findById() {
    this.classRepository.findById(+this.activatedRoute.snapshot.params.id)
      .subscribe((result) =>
        this.class = result
      );
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

    this.classRepository.save(this.class)
      .then(() => {
        this.router.navigate(['enrollment/classes']);
        this.messageService.toastSuccess();
      });
  }

}
