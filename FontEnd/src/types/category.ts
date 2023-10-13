export type TCategory = {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  
  export type CategoryType = {
    docs: TCategory[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
  export type TQueryParamscategory = {
    _page?: number;
    _limit?: number;
    _categoryId?: string;
  };