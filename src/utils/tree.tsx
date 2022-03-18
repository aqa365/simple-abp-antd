import { OrganizationUnitWithDetailsDto } from '@/services/identity/dtos/OrganizationUnitWithDetailsDto';
import { MenuItemDto } from '@/services/cms-kit/dtos/MenuItemDto';
export function convertToOrganizationUnitsTree(
  id: string | null,
  data: OrganizationUnitWithDetailsDto[],
  icon?: JSX.Element,
): any {
  const children = data.filter((c) => c.parentId == id);
  return children.map((c) => {
    return {
      title: c.displayName,
      key: c.id,
      icon,
      children: convertToOrganizationUnitsTree(c.id, data, icon),
    };
  });
}

export function convertToCmsMenuItemsTree(
  id: string | null,
  data: MenuItemDto[],
  icon?: JSX.Element,
): any {
  const children = data
    .filter((c) => c.parentId == id)
    .sort((a, b) => {
      return a.order - b.order;
    });
  return children.map((c) => {
    return {
      title: c.displayName,
      key: c.id,
      parentId: id,
      order: c.order,
      icon,
      children: convertToCmsMenuItemsTree(c.id, data, icon),
    };
  });
}
