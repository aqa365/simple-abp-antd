export interface BlogPostDto {
  id: string;
  blogId?: string;
  title: string;
  slug: string;
  shortDescription?: string;
  content: string;
  coverImageMediaId?: string;
  creationTime?: string;
  lastModificationTime?: string;
  concurrencyStamp?: string;
}
