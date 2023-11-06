export interface PaginatedOrder {
      docs: IOrder[];
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
interface IProductorder {
      _id?: number | string,
      product: string;
      quantity: number;
      name: string;

}
export interface Iuser {
      _id: string;
      email: string;
      fullName: string;
}
export interface IOrder {
      _id: string;
      orderNumber: string;
      status: number;
      customerName: string;
      shippingAddress: string;
      products: IProductorder[];
      buyer: string;
      totalAmount: number;
      timestamps: {
            createdAt: Date;
            updatedAt: Date;
      }
}  