
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
    sale_off?: number
    description?: string
    quantity?: number
    color?: string
    size?: string
    images?: string
    categoryId?: string
}
