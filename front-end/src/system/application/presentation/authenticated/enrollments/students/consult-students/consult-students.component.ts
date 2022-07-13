import {DialogService} from '../../../../../../domain/services/dialog.service';
import {MessageService} from '../../../../../../domain/services/message.service';
import {PaginationService} from '../../../../../../domain/services/pagination.service';
import {handlePageable} from '../../../../../utils/handle-data-table';
import {StudentRepository} from "../../../../../../domain/repository/student.repository";
import {ListPageComponent} from 'system/application/controls/crud/list/list-page.component';
import {People} from 'system/domain/entity/people.model';
import {Component, OnInit, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material";

// @ts-ignore
@Component({
  selector: 'consultar-students',
  templateUrl: './consult-students.component.html',
  styleUrls: ['../student.component.scss']
})
export class ConsultStudentsComponent implements OnInit {

  @ViewChild(ListPageComponent, {static: true})
  private student: People = new People();

  public filters: any = {defaultFilter: '', deletedFilter: false}; // Estado inicial dos filtros

  public pageable: any = {
    size: 20,
    page: 0,
    sort: null,
    defaultFilter: [],
    enableFilter: true
  };

  public totalElements: any;
  public pageIndex: any;
  public pageSize: any;

  public columns: any[] = [
    {name: 'name', label: 'Nome'},
    {name: 'email', label: "E-mail"},
    {name: 'document', label: "CPF"},
  ];

  public displayedColumns: string[] = this.columns.map(cell => cell.name);

  public dataSource = new MatTableDataSource();

  /**
   * @param dialogService {DialogService}
   * @param paginationService {PaginationService}
   * @param messageService {MessageService}
   * @param studentRepository {StudentRepository}
   */
  constructor(private dialogService: DialogService,
              paginationService: PaginationService,
              private messageService: MessageService,
              private studentRepository: StudentRepository) {

    this.displayedColumns.push('acoes');
    this.pageable = paginationService.pageable('name');

  }

  /**
   *
   */
  ngOnInit() {
    // Seta o size do pageable no size do paginator
    (this.student as any).paginator.pageSize = this.pageable.size;

    // Sobrescreve o sortChange do sort bindado
    this.sortChange();
  }

  /**
   *
   */
  public sortChange() {
    (this.student as any).sort.sortChange.subscribe(() => {
      const {active, direction} = (this.student as any).sort;
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

    const pageable = handlePageable(hasAnyFilter, (this.student as any).paginator, this.pageable);
    pageable.enableFilter = (this.student as any).filters.enableFilter;
    pageable.defaultFilter = (this.student as any).filters.defaultFilter;
    this.studentRepository.listByFilters(pageable)
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result.content);
        this.totalElements = result.totalElements;
        this.pageSize = result.size;
        this.pageIndex = result.pageable.pageNumber;
      });
  }

  /**
   * Função para confirmar a exclusão de um registro permanentemente
   * @param student
   */
  public openDeleteDialog(student) {

    this.dialogService.confirmDelete(student, 'ALUNO')
      .then((accept: boolean) => {

        if (accept) {
          this.studentRepository.delete(student.id)
            .then(() => {
              this.listByFilters();
              this.messageService.toastSuccess('Aluno excluído com sucesso')
            });
        }
      });
  }
}

