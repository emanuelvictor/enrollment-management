import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material';
import {AuthenticatedViewComponent} from '../../../../authenticated-view.component';
import {MessageService} from '../../../../../../../domain/services/message.service';
import {debounce} from "../../../../../../utils/debounce";
import {FormBuilder, FormControl, Validators} from "@angular/forms"
import {StudentRepository} from "../../../../../../../domain/repository/student.repository";
import {CrudViewComponent} from "../../../../../../controls/crud/crud-view.component";
import {People} from "../../../../../../../domain/entity/people.model";
import 'rxjs/add/operator/debounceTime';
import {debounceTime, switchMap} from 'rxjs/operators';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@Component({
  selector: 'student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['../../student.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ]
})
export class StudentFormComponent extends CrudViewComponent implements OnInit {

  @Input() entity: People = new People();

  @Output() save: EventEmitter<People> = new EventEmitter();

  students: any;

  student: People = new People();

  public debounce = debounce;

  /**
   *
   * @param router
   * @param snackBar
   * @param homeView
   * @param activatedRoute
   * @param messageService
   * @param studentRepository
   * @param element
   * @param fb
   * @param renderer
   * @param studentRepository
   */
  constructor(private router: Router,
              public snackBar: MatSnackBar,
              public activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private studentRepository: StudentRepository,
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
      email: new FormControl({value: '', disabled: false}, Validators.required),
      cpf: new FormControl({value: '', disabled: false}, Validators.required)
    })

  }

  emit(entity: any) {
    this.save.emit(entity)
  }
}
