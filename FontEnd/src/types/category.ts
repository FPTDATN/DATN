export interface ICategory {
      _id? : string ;
      name : string ;
      createAt:Date;
      updateAt:Date;
}
export interface IPaginatedCategory{
      docs: ICategory[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: null;
    page: number;
    pagingCounter: number;
    prevPage: null;
    totalDocs: number;
    totalPages: number;
 }