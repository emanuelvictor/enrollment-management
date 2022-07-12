import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {ClassRepository} from "../../../../../../domain/repository/class.repository";
import {DialogService} from "../../../../../../domain/services/dialog.service";
import {Class} from "../../../../../../domain/entity/class.model";

// @ts-ignore
@Component({
  selector: 'view-class',
  templateUrl: 'view-class.component.html',
  styleUrls: ['../classes.component.scss']
})
export class ViewClassComponent implements OnInit {

  /**
   *
   */
  class: Class = new Class();

  /**
   *
   * @param router
   * @param homeView
   * @param dialogService
   * @param activatedRoute
   * @param messageService
   * @param classRepository
   */
  constructor(private router: Router,
              private dialogService: DialogService,
              public activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private homeView: AuthenticatedViewComponent,
              private classRepository: ClassRepository) {

    this.class.id = +this.activatedRoute.snapshot.params.id || null;
    homeView.toolbar.subhead = 'Class / Detalhes';

  }

  /**
   *
   */
  ngOnInit() {
    if (this.class && this.class.id) {
      this.findById();
    } else {
      this.router.navigate(['/classs'])
    }
  }

  /**
   *
   */
  public findById() {
    this.classRepository.findById(this.class.id)
      .subscribe((result) => this.class = result)
  }

}
