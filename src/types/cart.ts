export type Coupon = {
  _id: string;
  code: string;
  discount: number;
  maxDiscount: number;
  discountType: "percentage" | "amount";
  expirationDate: string;
  isActive: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
