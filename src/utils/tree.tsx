export function convertToOrganizationUnitsTree(
  id: string | null,
  data: Identity.OrganizationUnit[],
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
): any {
  const children = data.filter((c) => c.parentId == id);
  return children.map((c) => {
    return {
      title: c.title,
      value: c.id,
      children: convertToArticleCatalogTreeSelect(c.id, data),
    };
  });
}
