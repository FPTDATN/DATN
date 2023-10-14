export interface PaginatedCategory {
  docs: CategoryType[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: null;
  page: number;
  pagingCounter: number;
  prevPage: null;
  };
  export type TQueryParamscategory = {
    _page?: number;
    _limit?: number;
  _search?: string;
  };

export interface CategoryType {
    _id:string;
    name:string;
    createdAt: string;
}

