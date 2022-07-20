import {DialogService} from '../../../../../../domain/services/dialog.service';
import {MessageService} from '../../../../../../domain/services/message.service';
import {PaginationService} from '../../../../../../domain/services/pagination.service';
import {handlePageable} from '../../../../../utils/handle-data-table';
import {EnrollmentRepository} from "../../../../../../domain/repository/enrollment.repository";
import {ListPageComponent} from 'system/application/controls/crud/list/list-page.component';
import {Enrollment} from 'system/domain/entity/enrollment.model';
import {Component, OnInit, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material";

// @ts-ignore
@Component({
  selector: 'consult-enrollments',
  templateUrl: './consult-enrollments.component.html',
  styleUrls: ['../enrollment.component.scss']
})
export class ConsultEnrollmentsComponent implements OnInit {

  @ViewChild(ListPageComponent, {static: true})
  private enrollment: Enrollment = new Enrollment();

  public filters: any = {defaultFilter: ''}; // Estado inicial dos filtros

  public pageable: any = {
    size: 20,
    page: 0,
    sort: null,
    defaultFilter: []
  };

  public totalElements: any;
  public pageIndex: any;
  public pageSize: any;

  public columns: any[] = [
    {name: 'student.name', label: "Nome do Aluno"},
    {name: 'student.email', label: "Email do Aluno"},
    {name: 'student.document', label: "CPF do Aluno"},
    {name: 'class.name', label: "Nome da Turma"}
  ];

  public displayedColumns: string[] = this.columns.map(cell => cell.name);

  public dataSource = new MatTableDataSource();

  /**
   * @param dialogService {DialogService}
   * @param paginationService {PaginationService}
   * @param messageService {MessageService}
   * @param enrollmentRepository {EnrollmentRepository}
   */
  constructor(private dialogService: DialogService,
              paginationService: PaginationService,
              private messageService: MessageService,
              private enrollmentRepository: EnrollmentRepository) {

    this.displayedColumns.push('acoes');
    this.pageable = paginationService.pageable('student.name');

  }

  /**
   *
   */
  ngOnInit() {
    // Seta o size do pageable no size do paginator
    (this.enrollment as any).paginator.pageSize = this.pageable.size;

    // Sobrescreve o sortChange do sort bindado
    this.sortChange();
  }

  /**
   *
   */
  public sortChange() {
    (this.enrollment as any).sort.sortChange.subscribe(() => {
      const {active, direction} = (this.enrollment as any).sort;
      this.pageable.sort = {'properties': active, 'direction': direction};
      this.listByFilters();
    });
  }

  /**
   *
   * @param hasAnyFilter Verifica se há algum filtro,
   * caso exista, então será redirecionado para a primeira página
   */
  public listByFilters(hasAnyFilter: boolean = false) {

    const pageable = handlePageable(hasAnyFilter, (this.enrollment as any).paginator, this.pageable);
    pageable.defaultFilter = (this.enrollment as any).filters.defaultFilter;
    this.enrollmentRepository.listByFilters(pageable)
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result.content);
        this.totalElements = result.totalElements;
        this.pageSize = result.size;
        this.pageIndex = result.pageable.pageNumber;
      });
  }

  /**
   * Função para confirmar a exclusão de um registro permanentemente
   * @param enrollment
   */
  public openDeleteDialog(enrollment) {

    this.dialogService.confirmDelete(enrollment, 'MATRÍCULA')
      .then((accept: boolean) => {

        if (accept) {
          this.enrollmentRepository.delete(enrollment.id)
            .then(() => {
              this.listByFilters();
              this.messageService.toastSuccess('Matrícula excluída com sucesso')
            });
        }
      });
  }
}

