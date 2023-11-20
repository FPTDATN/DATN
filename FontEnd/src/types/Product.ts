export interface PaginatedProduct {
    docs: ProductType[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: null;
    pagingCounter: number;
    prevPage: null;
    totalDocs: number;
    totalPages: number;
    _page?: number;
    _limit?: number;
  _search?: string;
}

export interface ProductType {
    _id: string;
    name: string;
    price: number;
    sale_off: number;
    description: string;
    quantity: number;
    colorId?: Colors[];
    sizeId?: Sizes[];
     brandId?:Brand;
    images: string[];
    createAt:Date;
    updateAt:Date;
    categoryId?: Category;
    
}

export type ExtendProduct = ProductType & {
    colorId: Colors;
    sizeId?: Sizes;
    categoryId?: Category;
}

interface Brand {
    _id:string;
    name:string;
}

interface Colors {
    _id:string;
    name:string;
}

interface Sizes {
    _id:string;
    name:string;
}

interface Category {
    _id:string;
    name:string;
}

  