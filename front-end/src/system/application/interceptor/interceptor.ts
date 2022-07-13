import {Observable, throwError as observableThrowError} from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';


import {Router} from '@angular/router';
import {MessageService} from '../../domain/services/message.service';
import {MatSnackBar} from "@angular/material";

@Injectable()
export class Interceptor implements HttpInterceptor {

  /**
   * Instancia a partir do window o NProgress
   */
  progress = window['NProgress'];

  /**
   *
   * @param snackBar
   * @param messageService
   * @param router
   */
  constructor(private messageService: MessageService,
              private router: Router, private snackBar: MatSnackBar) {
  }

  /**
   * Intercepta todas as requisições
   * @param {HttpRequest<>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.progress.start();

      return next.handle(req)
        .do(evt => {

          if (evt instanceof HttpResponse)
            this.progress.done();

          else
            this.progress.inc(0.4);

        })
        .catch(this.catchErrors());

  }

  /**
   * Função privada, captura os erros
   * @returns {(res: any) => ErrorObservable}
   */
  private catchErrors() {
    /**
     * Encerra progress
     */
    this.progress.done();

    return (res: any) => {

      if (res.error) {

        if (typeof res.error === 'string')
          res.error = JSON.parse(res.error)
      }

      if ((res.status === 403 || res.status === 401) && !this.authenticationService.access.refresh_token)
        console.log('logout');
      else
        this.error(res.error.message);

      return this.innerHandler(res)
    };
  }

  /**
   *
   * @param res
   */
  private innerHandler(res): Observable<never> {

    this.progress.done();

    return observableThrowError(res)

  }

  /**
   *
   * @param message
   */
  public error(message: string) {
    this.messageService.toastError(message);
  }
}
