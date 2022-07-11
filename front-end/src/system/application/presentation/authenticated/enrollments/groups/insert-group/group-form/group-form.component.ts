import {Component, ElementRef, Inject, Input, OnInit, Renderer} from '@angular/core';
import {CrudViewComponent} from "../../../../../../controls/crud/crud-view.component";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatSnackBar} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {PermissionRepository} from "../../../../../../../domain/repository/permission.repository";
import {Permission} from "../../../../../../../domain/entity/permission.model";
import {Group} from "../../../../../../../domain/entity/group.model";
import {GroupPermission} from "../../../../../../../domain/entity/group-permission.model";

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

// @ts-ignore
@Component({
  selector: 'group-form',
  templateUrl: 'group-form.component.html',
  styleUrls: ['../../groups.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ]
})
export class GroupFormComponent extends CrudViewComponent implements OnInit {

  /**
   *
   */
  permissions: Permission[];

  /**
   *
   */
  @Input()
  entity: Group = new Group();

  /**
   *
   * @param snackBar
   * @param activatedRoute
   * @param element
   * @param permissionRepository
   * @param fb
   * @param renderer
   */
  constructor(public snackBar: MatSnackBar,
              public activatedRoute: ActivatedRoute,
              @Inject(ElementRef) public element: ElementRef,
              private permissionRepository: PermissionRepository,
              public fb: FormBuilder, public renderer: Renderer) {
    super(snackBar, element, fb, renderer, activatedRoute);
  }

  /**
   *
   */
  ngOnInit() {
    this.entity.enable = true;
    this.form = this.fb.group({
      name: ['name', [Validators.required]]
    });

    this.permissionRepository.listByFilters({branch: true})
      .subscribe(result => {
        this.permissions = result.content;

        if (this.entity.id) {
          let permissions = this.entity.groupPermissions.map(a => a.permission);
          permissions = this.organize(permissions);
          this.organizeTheSelecteds(permissions, this.permissions);

          this.entity.groupPermissions = [];

          for (let i = 0; i < permissions.length; i++) {
            if (permissions[i]) {
              const groupPermission: GroupPermission = new GroupPermission();

              // Remove recursividade
              const group: Group = new Group();
              group.id = this.entity.id;
              group.enable = this.entity.enable;
              group.name = this.entity.name;

              groupPermission.group = group;
              groupPermission.permission = permissions[i];

              this.entity.groupPermissions.push(groupPermission)
            }
          }
        }
      })
  }

  /**
   *
   * @param permissions
   */
  organize(permissions: Permission[]): Permission[] {

    for (let i = 0; i < permissions.length; i++) {

      if (permissions[i].upperPermission && (permissions[i].upperPermission as any).id)
        permissions[i].upperPermission = (permissions[i].upperPermission as any).id;

      if (!permissions[i].id)
        permissions[i] = this.findPermission(this.permissions, (permissions[i] as any));
      else if (permissions[i].lowerPermissions)
        permissions[i].lowerPermissions = this.organize(permissions[i].lowerPermissions);
    }

    return permissions
  }

  /**
   * Pesqusia a permissão pelo ID
   * @param ownPermissoes
   * @param allPermissoes
   */
  public organizeTheSelecteds(ownPermissoes: Permission[], allPermissoes: Permission[]): void {
    for (let i = 0; i < allPermissoes.length; i++) {
      const permission: Permission = this.findPermission(ownPermissoes, allPermissoes[i].id);

      if (permission) {
        (permission as any).selected = true;
        allPermissoes[i] = permission;
      } else if (allPermissoes[i].lowerPermissions && allPermissoes[i].lowerPermissions.length)
        this.organizeTheSelecteds(ownPermissoes, allPermissoes[i].lowerPermissions)
    }
  }

  /**
   *
   * @param permission
   */
  addPermission(permission: Permission) {

    const groupPermission: GroupPermission = new GroupPermission();

    // Remove recursividade
    const group: Group = new Group();
    group.id = this.entity.id;
    group.enable = this.entity.enable;
    group.name = this.entity.name;

    groupPermission.group = group;
    groupPermission.permission = permission;

    this.entity.groupPermissions.push(groupPermission);

    if ((permission.upperPermission && this.findPermission(this.permissions, permission.upperPermission)) && this.findPermission(this.permissions, permission.upperPermission).lowerPermissions.length === this.entity.groupPermissions.map(a => a.permission).filter(a => a.upperPermission === permission.upperPermission).length) {

      this.entity.groupPermissions = this.entity.groupPermissions.filter(a => a.permission.upperPermission !== permission.upperPermission);

      this.addPermission(this.findPermission(this.permissions, permission.upperPermission))

    } else {

      let permissions: Permission[] = this.removeDuplicates(this.organize(this.entity.groupPermissions.map(a => a.permission)));

      // Apenas verificação cautelar
      if (permissions && permissions.length) {
        this.entity.groupPermissions = [];

        permissions.forEach(permission => {
          const groupPermission: GroupPermission = new GroupPermission();

          // Remove recursividade
          const group: Group = new Group();
          group.id = this.entity.id;
          group.enable = this.entity.enable;
          group.name = this.entity.name;

          groupPermission.group = group;
          groupPermission.permission = permission;

          this.entity.groupPermissions.push(groupPermission);
        });
      }

      console.log(this.entity.groupPermissions.map(a => a.permission.name));

    }


  }

  /**
   * Remove os ítens repetidos
   * @param permissionsLineares
   */
  removeDuplicates(permissionsLineares: Permission[]): Permission[] {
    for (let i = 0; i < permissionsLineares.length; i++) {
      for (let k = 0; k < permissionsLineares.length; k++) {
        if (permissionsLineares[i] && permissionsLineares[k]) {

          // Se encontrou nos filhos de dentro
          const founded = this.findPermission(permissionsLineares[i].lowerPermissions, permissionsLineares[k].id);
          if (founded) {
            (permissionsLineares[k] as any).toDelete = true;
          }

        }
      }
    }

    // Remove irmãos repetidos
    return permissionsLineares.filter(function (este, i) {
      return permissionsLineares.indexOf(este) === i;
    }).filter(permission => !(permission as any).toDelete);
  }

  /**
   *
   * @param permission
   */
  removePermission(permission: Permission) {

    const permissions: Permission[] = this.runToRemove(permission, this.entity.groupPermissions.map(a => a.permission));

    this.entity.groupPermissions = [];

    for (let i = 0; i < permissions.length; i++) {
      if (permissions[i]) {
        const groupPermission: GroupPermission = new GroupPermission();

        // Remove recursividade
        const group: Group = new Group();
        group.id = this.entity.id;
        group.enable = this.entity.enable;
        group.name = this.entity.name;

        groupPermission.group = group;
        groupPermission.permission = permissions[i];

        this.entity.groupPermissions.push(groupPermission)
      }
    }

    console.log(this.entity.groupPermissions.map(a => a.permission.name));
  }


  /**
   * @param permissionToRemove
   * @param linkedPermissions
   */
  public runToRemove(permissionToRemove: Permission, linkedPermissions: Permission[]): Permission[] {
    for (let i = 0; i < linkedPermissions.length; i++) {
      if (linkedPermissions[i] && permissionToRemove) {
        if (linkedPermissions[i].id === permissionToRemove.id) {
          const copia = linkedPermissions.slice();
          copia.splice(i, 1);
          return copia;
        } else if (linkedPermissions[i].lowerPermissions && linkedPermissions[i].lowerPermissions.length) {

          if (this.findPermission(linkedPermissions[i].lowerPermissions, permissionToRemove.id)) {
            const aux = linkedPermissions.slice();
            aux.splice(i, 1);
            return aux.concat(this.runToRemove(permissionToRemove, linkedPermissions[i].lowerPermissions));
          }

        }
      }
    }
    return linkedPermissions;
  }

  /**
   * Pesqusia a permissão pelo ID
   * @param permissions
   * @param id
   */
  public findPermission(permissions: Permission[], id: number): Permission {
    for (let i = 0; i < permissions.length; i++) {
      if (permissions[i]) {
        if (permissions[i].id === id)
          return permissions[i];
        else if (permissions[i].lowerPermissions && permissions[i].lowerPermissions.length) {
          const permission: Permission = this.findPermission(permissions[i].lowerPermissions, id);
          if (permission)
            return permission;
        }
      }
    }
  }
}
