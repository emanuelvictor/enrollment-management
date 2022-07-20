import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material';
import { AuthenticatedViewComponent } from '../../../../authenticated-view.component';
import { MessageService } from '../../../../../../../domain/services/message.service';
import { debounce } from "../../../../../../utils/debounce";
import { FormBuilder, FormControl, Validators } from "@angular/forms"
import { ClassRepository } from "../../../../../../../domain/repository/class.repository";
import { StudentRepository } from "../../../../../../../domain/repository/student.repository";
import { CrudViewComponent } from "../../../../../../controls/crud/crud-view.component";
import { People } from "../../../../../../../domain/entity/people.model";
import 'rxjs/add/operator/debounceTime';
import { debounceTime, switchMap } from 'rxjs/operators';
import { COMMA, ENTER, T } from '@angular/cdk/keycodes';
import { ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { from, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Enrollment } from 'system/domain/entity/enrollment.model';
import { isNullOrUndefined } from "util";
import 'rxjs/add/operator/map';

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
export class StudentFormComponent extends CrudViewComponent {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredEnrollments: Enrollment[] = [];
  allEnrollments: any[] = [];

  @ViewChild('enrollmentsInput', { static: false }) enrollmentsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  @Input() entity: People = new People();

  @Output() save: EventEmitter<People> = new EventEmitter();

  public debounce = debounce;

  /**
   * 
   * @param router 
   * @param snackBar 
   * @param activatedRoute 
   * @param messageService 
   * @param studentRepository 
   * @param homeView 
   * @param element 
   * @param fb 
   * @param renderer 
   */
  constructor(private router: Router,
    public snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private classRepository: ClassRepository,
    private studentRepository: StudentRepository,
    private homeView: AuthenticatedViewComponent,
    @Inject(ElementRef) public element: ElementRef,
    public fb: FormBuilder, public renderer: Renderer) {

    super(snackBar, element, fb, renderer, activatedRoute);

    this.form = this.fb.group({
      name: new FormControl({ value: '', disabled: false }, Validators.required),
      email: new FormControl({ value: '', disabled: false }, Validators.required),
      cpf: new FormControl({ value: '', disabled: false }, Validators.required),
      enrollments: new FormControl({ value: '', disabled: false })
    });

    this.filteredEnrollments = this.form.controls.enrollments.valueChanges.subscribe(className => {
      if (className && className !== '')
        this._filter(className).then(content => {
          this.filteredEnrollments = content
        })
    })

  }

  /**
   * 
   * @param entity 
   */
  emit(entity: any) {

    entity.enrollments = entity.enrollments.map(enrollment => {
      return {
        id: enrollment.id,
        class: { id: enrollment.class.id, name: enrollment.class.name },
        student: { id: entity.id }
      }
    })

    this.save.emit(entity)
  }

  /**
   * 
   * @param event 
   */
  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our class
      if (value && value != '')
        this.entity.enrollments.push(value as any);

      // Reset the input value
      if (input)
        input.value = '';

      this.form.controls.enrollments.setValue(null)
    }
  }

  /**
   * 
   * @param enrollment 
   */
  remove(enrollment: Enrollment): void {
    const index = this.entity.enrollments.indexOf(enrollment);
    if (index >= 0)
      this.entity.enrollments.splice(index, 1)
  }

  /**
   * 
   * @param event 
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    this.entity.enrollments.push(event.option.value);
    this.enrollmentsInput.nativeElement.value = '';
    this.form.controls.enrollments.setValue(null);
  }

  /**
   * 
   * @param value 
   
   * @returns 
   */
  private _filter(value: any): Promise<any> {

    let filterValue = '';
    if (value && value.class)
      filterValue = value.class.name.toLowerCase();
    else
      filterValue = value.toLowerCase();

    const that = this;

    return new Promise(function (resolve, reject) {
      that.classRepository.listByFilters(filterValue).toPromise()
        .then(result => {
          const content = result.content
            .map(clazz => {
              const enrollment = new Enrollment();
              enrollment.class = clazz;
              return enrollment
            })
            .filter(enrollment => {
              return enrollment['class'].name.toLowerCase().indexOf(filterValue) === 0
            })
            .filter(enrollment => {

              const find = that.entity.enrollments && that.entity.enrollments.filter(enr => {
                return enr.class.id === enrollment.class.id
              }).length > 0;

              return !find
            })
          resolve(content)
        })
        .catch(exception => {
          reject(exception)
        })
    });
  }
}
