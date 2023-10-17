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
    colorId?: Colors[];
    sizeId?: Sizes[];
    brandId?:Brand;
    images: string[];
    createAt:Date;
    updateAt:Date;
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