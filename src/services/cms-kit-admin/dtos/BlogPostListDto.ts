export interface BlogPostListDto {
  id: string;

  blogId: string;

  blogName: string;

  title: string;

  slug: string;

  shortDescription?: string;

  content: string;

  coverImageMediaId?: string;

  creationTime?: string;

  lastModificationTime?: string;
}
