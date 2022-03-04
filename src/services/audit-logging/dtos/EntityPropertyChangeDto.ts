export interface EntityPropertyChangeDto {
  id: string;
  tenantId?: string;

  entityChangeId?: string;

  newValue?: string;

  originalValue?: string;

  propertyName?: string;

  propertyTypeFullName?: string;
}
