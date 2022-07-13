import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material';
import {AuthenticatedViewComponent} from '../../../../authenticated-view.component';
import {MessageService} from '../../../../../../../domain/services/message.service';
import {debounce} from "../../../../../../utils/debounce";
import {FormBuilder, FormControl, Validators} from "@angular/forms"
import {EnrollmentRepository} from "../../../../../../../domain/repository/enrollment.repository";
import {CrudViewComponent} from "../../../../../../controls/crud/crud-view.component";
import {Enrollment} from "../../../../../../../domain/entity/enrollment.model";
import 'rxjs/add/operator/debounceTime';
import {debounceTime, switchMap} from 'rxjs/operators';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@Component({
  selector: 'enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['../../enrollment.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ]
})
export class EnrollmentFormComponent extends CrudViewComponent implements OnInit {

  @Input() entity: Enrollment = new Enrollment();

  @Output() save: EventEmitter<Enrollment> = new EventEmitter();

  enrollments: any;

  enrollment: Enrollment = new Enrollment();

  public debounce = debounce;

  /**
   *
   * @param router
   * @param snackBar
   * @param homeView
   * @param activatedRoute
   * @param messageService
   * @param enrollmentRepository
   * @param element
   * @param fb
   * @param renderer
   * @param enrollmentRepository
   */
  constructor(private router: Router,
              public snackBar: MatSnackBar,
              public activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private enrollmentRepository: EnrollmentRepository,
              private homeView: AuthenticatedViewComponent,
              @Inject(ElementRef) public element: ElementRef,
              public fb: FormBuilder, public renderer: Renderer) {

    super(snackBar, element, fb, renderer, activatedRoute);

  }

  /**
   *
   */
  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl({value: '', disabled: false}, Validators.required),
      clientId: ['clientId', [Validators.required/*, Validators.email*/]],
    });

    // this.form
    //   .get('email')
    //   .valueChanges
    //   .pipe(
    //     debounceTime(100),
    //     switchMap(value =>
    //       this.userRepository.findByLdapEnrollmentname((value as string))
    //     )
    //   )
    //   .subscribe(user => {
    //     if (user) {
    //
    //       this.users = [user];
    //
    //       if (this.form.get('email').value.includes('@')) {
    //
    //         this.entity.name = user.name;
    //         this.form.controls['name'].disable();
    //
    //       } else
    //
    //         this.form.controls['name'].enable();
    //
    //     } else {
    //
    //       this.users = [];
    //       this.form.controls['name'].enable();
    //
    //     }
    //   });

  }

  emit(entity: any) {
    this.save.emit(entity)
  }

  // /**
  //  *
  //  */
  // getEmail() {
  //   this.entity.email = this.form.get('email').value;
  // }
  //
  // notFirst: boolean = false;
  //
  // /**
  //  *
  //  * @param email
  //  */
  // displayFn(email) {
  //   if (this.notFirst)
  //     return email;
  //   else this.notFirst = true;
  // }
}
