export interface BlogDto {
  id: string;
  name: string;
  slug: string;
  concurrencyStamp?: string;
}
