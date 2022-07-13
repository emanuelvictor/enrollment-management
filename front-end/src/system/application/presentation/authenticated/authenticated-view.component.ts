import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingMode, LoadingType, TdLoadingService} from '@covalent/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {Subscription} from 'rxjs';
import {MessageService} from '../../../domain/services/message.service';
import {TranslateService} from '@ngx-translate/core';
import {StudentRepository} from "../../../domain/repository/student.repository";

// @ts-ignore
@Component({
  selector: 'authenticated-view',
  templateUrl: './authenticated-view.component.html',
  styleUrls: ['./authenticated-view.component.scss']
})
export class AuthenticatedViewComponent implements OnInit, OnDestroy {
  /**
   *
   */
  public routerSubscription: Subscription;

  /**
   *
   */
  public toolbar: any = {headline: 'Cadastros', subhead: ''};

  /**
   *
   * @param translate
   * @param activeRoute
   * @param messageService
   * @param loadingService
   * @param dialog
   * @param router
   */
  constructor(private translate: TranslateService,
              private activeRoute: ActivatedRoute,
              private messageService: MessageService,
              private loadingService: TdLoadingService,
              private dialog: MatDialog, private router: Router) {

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('pt-br');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('pt-br');

    this.loadingService.create({
      name: 'loadingLogin',
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Circular,
      color: 'primary'
    })
  }

  /**
   *
   */
  ngOnInit() {
    this.getAuthenticatedUser();
  }

  /**
   *
   */
  public logout() {
  }

  /**
   *
   */
  public getAuthenticatedUser() {
  }


  /**
   *
   */
  ngOnDestroy() {
  }
}
