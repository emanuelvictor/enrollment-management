import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material';
import { AuthenticatedViewComponent } from '../../../../authenticated-view.component';
import { MessageService } from '../../../../../../../domain/services/message.service';
import { debounce } from "../../../../../../utils/debounce";
import { FormBuilder, FormControl, Validators } from "@angular/forms"
import { StudentRepository } from "../../../../../../../domain/repository/student.repository";
import { CrudViewComponent } from "../../../../../../controls/crud/crud-view.component";
import { People } from "../../../../../../../domain/entity/people.model";
import 'rxjs/add/operator/debounceTime';
import { debounceTime, switchMap } from 'rxjs/operators';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Enrollment } from 'system/domain/entity/enrollment.model';

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
  filteredEnrollments: Observable<string[]>;
  allEnrollments: any[] = [
    {
      'class': { name: 'Name 1', id: 1 }
    },
    {
      'class': { name: 'Name 2', id: 2 }
    },
    {
      'class': { name: 'Name 3', id: 3 }
    },
    {
      'class': { name: 'Name 45', id: 4 }
    },
    {
      'class': { name: 'Boa Noite', id: 5 }
    }
  ];

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
    private studentRepository: StudentRepository,
    private homeView: AuthenticatedViewComponent,
    @Inject(ElementRef) public element: ElementRef,
    public fb: FormBuilder, public renderer: Renderer) {

    super(snackBar, element, fb, renderer, activatedRoute);

    this.form = this.fb.group({
      name: new FormControl({ value: '', disabled: false }, Validators.required),
      email: new FormControl({ value: '', disabled: false }, Validators.required),
      cpf: new FormControl({ value: '', disabled: false }, Validators.required),
      enrollments: new FormControl({ value: '', disabled: false }, Validators.required)
    });

    this.filteredEnrollments = this.form.controls.enrollments.valueChanges.pipe(
      startWith(null),
      map((className: string | null) => {
        return className ? this._filter(className) : this._filter('')
      }))
  }

  /**
   * 
   * @param entity 
   */
  emit(entity: any) {
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
    if (index >= 0) {
      this.entity.enrollments.splice(index, 1);
    }
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
  private _filter(value: any): Enrollment[] {
    let filterValue = '';
    if (value && value.class)
      filterValue = value.class.name.toLowerCase();
    else
      filterValue = value.toLowerCase();

    return this.allEnrollments
      .filter(enrollment => {
        return enrollment['class'].name.toLowerCase().indexOf(filterValue) === 0
      }).filter(enrollment => {

        const find = this.entity.enrollments.filter(enr => {
          return enr.class.id === enrollment.class.id
        }).length > 0;

        return !find
      })
  }
}
