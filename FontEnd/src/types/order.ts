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
            _id? :number| string,
            product: string;
            quantity: number;
            name : string;
            
         }
   export interface Iuser {
            email:string;
            fullName:string;
        }    
   export  interface IOrder {
         _id : string ;
         orderNumber: string;
         status: string;
         customerName: string;
         shippingAddress: string;
         products: IProductorder[];
         buyers: Iuser[];
         totalAmount : number
         }  