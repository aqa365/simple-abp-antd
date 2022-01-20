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
