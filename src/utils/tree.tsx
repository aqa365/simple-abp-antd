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
  const children = data.filter((c) => c.parentId == id);
  return children.map((c) => {
    return {
      title: c.displayName,
      key: c.id,
      icon,
      children: convertToCmsMenuItemsTree(c.id, data, icon),
    };
  });
}

export function convertToArticleCatalogTree(
  id: string | null,
  data: Articles.Catalog[],
  icon?: JSX.Element,
): any {
  const children = data.filter((c) => c.parentId == id);
  return children.map((c) => {
    return {
      title: c.title,
      key: c.id,
      icon,
      children: convertToArticleCatalogTree(c.id, data, icon),
    };
  });
}

export function convertToArticleCatalogTreeSelect(
  id: string | null,
  data: Articles.Catalog[],
  disabledById?: string,
): any {
  const children = data.filter((c) => c.parentId == id);
  return children.map((c) => {
    return {
      label: c.title,
      value: c.id,
      disabled: disabledById === c.id || disabledById === c.parentId,
      children: convertToArticleCatalogTreeSelect(c.id, data, disabledById),
    };
  });
}
