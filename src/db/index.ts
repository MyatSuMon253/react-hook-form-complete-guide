import { FoodDeliveryFormType, FoodType } from "../types";

export const getFoodItems = () => {
  return [
    { foodId: 1, name: "Pizza", price: 10 },
    { foodId: 2, name: "Burger", price: 8 },
    { foodId: 3, name: "Salad", price: 5 },
    { foodId: 4, name: "Pasta", price: 12 },
    { foodId: 5, name: "Sandwich", price: 6 },
    { foodId: 6, name: "Steak", price: 15 },
    { foodId: 7, name: "Fish", price: 10 },
    { foodId: 8, name: "Chicken", price: 8 },
    { foodId: 9, name: "Soup", price: 5 },
    { foodId: 10, name: "Ice Cream", price: 6 },
  ] as FoodType[];
};

const ORDER_KEY = "order";
export const createOrder = (order: FoodDeliveryFormType) => {
  localStorage.setItem(ORDER_KEY, JSON.stringify(order));
};
