import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {Class} from "../../../../../../domain/entity/class.model";
import {ClassRepository} from "../../../../../../domain/repository/class.repository";

// @ts-ignore
@Component({
  selector: 'insert-class',
  templateUrl: 'insert-class.component.html',
  styleUrls: ['../classes.component.scss']
})
export class InsertClassComponent {

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
              private classRepository: ClassRepository,
              private homeView: AuthenticatedViewComponent) {

    homeView.toolbar.subhead = 'Class/ Adicionar'

  }

  public save(form) {

    if (form.invalid) {
      this.messageService.toastWarning();
      return;
    }

    this.classRepository.save(this.class)
      .then(() => {
        this.router.navigate(['enrollments/classes']);
        this.messageService.toastSuccess();
      });
  }

}
