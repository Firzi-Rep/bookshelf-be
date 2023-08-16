import { PermissionEntity } from 'src/modules/auth/domain/permission.entity';

export class RoleEntity {
  id: string;

  name: string;

  permissions: PermissionEntity[];

  createRole() {
    // Create a role
  }

  updateRole() {
    // Update a role
  }

  deleteRole() {
    // Delete a role
  }

  hasPermissions(inputPermissions: string[]) {
    // Check if a role has permissions

    return this.permissions.some((permission) => {
      return inputPermissions.includes(permission.name);
    });
  }

  removePermissions(inputPermissions: string[]) {
    // Remove permissions from a role
    this.permissions = this.permissions.filter((permission) => {
      return !inputPermissions.includes(permission.name);
    });
  }
}
