export interface PaginatedProduct {
    docs: ProductType[];
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

export interface ProductType {
    _id: string
    name: string
    price: number
    sale_off?: number;
    description?: string;
    quantity?: number;
    color?: string;
    colorId?: string;
    sizeId?: string;
    brandId?:string;
    images?: string[];
    createAt:Date;
    updateAt:Date;
    categoryId?: string;
}