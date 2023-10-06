export interface IOrder {
      _id?: number | string;
      orderNumber: string;
      status: string;
      customerName: string;
      shippingAddress: string;
      product: string;
      buyer: string;
      createdAt: string;
      customerPayments: string; 
    }