import { Product } from "./product";

export type CartItem = Product & {
  quantity: number;
  shippingPrice: number;
  shippingDate: string;
};

export type AuthType = "local" | "google";
export type UserRole = "customer" | "admin";

export type User = {
  _id: string;
  phoneNumber: string;
  address: string;
  name: string;
  email: string;
  password?: string;
  cartItems: CartItem[];
  googleId?: string;
  authType: AuthType;
  role: UserRole;
  lastLogin: Date | string;
  isVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date | string;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date | string;
  createdAt: string;
  updatedAt: string;
};

export type Coupon = {
  _id: string;
  code: string;
  discount: number;
  maxDiscount: number;
  discountType: "percentage" | "amount";
  discountFor: "product" | "shipping";
  minOrderAmount: number;
  expirationDate: string;
  isActive: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
