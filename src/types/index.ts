export type CheckoutFormType = {
  paymentMethod: string;
  deliveryIn: number;
};

export type DeliveryAddressFormType = {
  streetAddress: string;
  landmark: string;
  city: string;
  state: string;
};

export type FoodDeliveryFormType = {
  address: DeliveryAddressFormType;
  foodItems: OrderedFoodItemType[];
} & MasterFoodDeliveryFormType &
  CheckoutFormType;

export type FoodType = {
  foodId: number;
  name: string;
  price: number;
};

export type MasterFoodDeliveryFormType = {
  orderId: number;
  orderNo: number;
  customerName: string;
  mobile: string;
  email: string;
  gTotal: number;
  placedOn: Date;
};

export type OrderedFoodItemType = {
  foodId: number;
  price: number;
  quantity: number;
  totalPrice: number;
};

export type SelectOptionType =
  | string
  | { value: string; text: string }
  | { value: number; text: string };

// type FoodDeliveryFormType = {
//   orderNo: number;
//   customerName: string;
//   mobile: string;
//   email: string;
//   paymentMethod: string;
//   deliveryIn: number;
//   address: {
//     streetAddress: string;
//     landmark: string;
//     city: string;
//     state: string;
//   };
// };
