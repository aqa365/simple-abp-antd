export interface PageDto {
  id: string;
  creationTime: string;
  creatorId: string;
  lastModificationTime: string;
  lastModifierId: string;
  title: string;
  slug: string;
  content: string;
  script?: string;
  style?: string;
  concurrencyStamp?: string;
}
