export interface PaginatedCategory {
    docs: CategoryType[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: null;
    page: number;
    pagingCounter: number;
<<<<<<< HEAD
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
  export type TQueryParamscategory = {
    _page?: number;
    _limit?: number;
  _search?: string;
  };
=======
    prevPage: null;
    totalDocs: number;
    totalPages: number;
}

export interface CategoryType {
    _id:string;
    name:string;
}
>>>>>>> 64eea233a053366eb2c5574eba1ee7a225de4f12
