namespace Articles {
  type GetArticlesInput = {
    catalogTitle?: string;
    tagName?: string;
  } & Simple.Abp.PageRequest;

  type Article = {
    id: string;
    creationTime?: string;
    title?: string;
    tag?: string;
    seoPath?: string;
    summary?: string;
    content?: string;
    isTop?: boolean;
    isRefinement?: boolean;
    state?: number;
    order?: number;
    catalog?: Catalog;
    previous?: string;
    next?: string;
    displayState?: string;
    frontCreationTime?: string;
    frontUrl?: string;
  };

  type Catalog = {
    id: string;
    creationTime: string;
    parentId: string;
    title: string;
    description: string;
    articleCount: number;
  };

  type Tag = {
    id: string;
    name: string;
    articleCount: 0;
    creationTime: string;
    creatorId: string;
  };
}
