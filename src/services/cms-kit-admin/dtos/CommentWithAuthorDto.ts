import { CmsUserDto } from '@/services/cms-kit-admin/dtos/CmsUserDto';

export interface CommentWithAuthorDto {
  id: string;
  entityType: string;
  entityId: string;
  text: string;
  repliedCommentId?: string;
  creatorId: string;
  creationTime: string;
  author: CmsUserDto;
}
