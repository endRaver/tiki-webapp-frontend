import { Product } from "./product";
import { User } from "./user";

export type Order = {
  _id: string;
  orderNumber: string;
  user: User;
  products: [
    {
      product: Product;
      quantity: number;
      price: number;
    },
  ];
  status: string;
  shippingPrice: number;
  shippingDate: Date;
  shippingDiscount: number;
  paymentMethod: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
};
