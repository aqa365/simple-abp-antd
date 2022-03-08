export interface TagDto {
  id: string;
  entityType: string;
  name: string;
  concurrencyStamp?: string;
}
