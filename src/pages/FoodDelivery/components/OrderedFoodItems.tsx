import { ChangeEvent, useEffect, useState } from "react";
import {
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import Select from "../../../controls/Select";
import TextField from "../../../controls/TextField";
import { getFoodItems } from "../../../db";
import getRenderCount from "../../../hooks/getRenderCount";
import {
  FoodType,
  OrderedFoodItemType,
  SelectOptionType,
} from "../../../types";
import { roundTo2DecimalPoint } from "../../../utils";

const RenderCount = getRenderCount();

const OrderedFoodItems = () => {
  const [foodList, setFoodList] = useState<FoodType[]>([]);
  const [foodOptions, setFoodOptions] = useState<SelectOptionType[]>([]);

  useEffect(() => {
    const tempList: FoodType[] = getFoodItems();
    const tempOptions: SelectOptionType[] = tempList.map((x) => ({
      value: x.foodId,
      text: x.name,
    }));
    setFoodList(tempList);
    setFoodOptions([{ value: 0, text: "Select" }, ...tempOptions]);
  }, []);

  const { register, setValue, getValues, trigger } = useFormContext<
    { gTotal: number } & {
      foodItems: OrderedFoodItemType[];
    }
  >();

  const { errors } = useFormState<{
    foodItems: OrderedFoodItemType[];
  }>({ name: "foodItems" });

  const {
    fields,
    append,
    prepend,
    insert,
    move,
    swap,
    remove,
    update,
    replace,
  } = useFieldArray<{
    foodItems: OrderedFoodItemType[];
  }>({
    name: "foodItems",
    rules: {
      minLength: {
        value: 1,
        message: "Minimum 1 order items required",
      },
      validate: {
        noDuplicate: (values) => {
          return (
            new Set(values.map((item) => item.name)).size === values.length ||
            "No duplicate allowed"
          );
        },
      },
      required: "No food in the order",
    },
  });

  const selectedFoodItems: OrderedFoodItemType[] = useWatch<{
    foodItems: OrderedFoodItemType[];
  }>({ name: "foodItems" });

  useWatch("gTotal");

  const updateGrandTotal = () => {
    let gTotal = 0;
    if (selectedFoodItems && selectedFoodItems.length > 0) {
      gTotal = selectedFoodItems.reduce(
        (sum, curr) => sum + curr.totalPrice,
        0
      );
    }
    setValue("gTotal", roundTo2DecimalPoint(gTotal));
  };

  useEffect(() => {
    updateGrandTotal();
  }, [selectedFoodItems]);

  const onRowAdd = () => {
    // add new object at the end of the field array
    // append(
    //   { name: "Food", quantity: 0 },
    //   {
    //     shouldFocus: true,
    //     focusIndex: 0,
    //     focusName: "foodItems.0.quantity",
    //   }
    // );

    // add new object at the beginning of the field array
    // prepend({ name: "Food", quantity: 0 });

    // add new object at the specific index of the field array
    insert(3, { name: "Food", quantity: 0 });
  };

  const onSwapAndMove = () => {
    // swap(0, 2);
    move(0, 2);
  };

  const onUpdateAndReplace = () => {
    // update is need to pass the whole set of object
    // update(1, { name: "Food updated", quantity: 10 });

    // setValue is only need to pass update value
    // setValue("foodItems.1.quantity", 5);

    // replace the whole array and extra items are removed
    replace([
      { name: "Food 1", quantity: 10 },
      { name: "Food 2", quantity: 11 },
    ]);
  };

  const onRowDelete = (index: number) => {
    // only delete specific index
    remove(index);

    // delete all items
    // remove();
  };

  const onFoodChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    const foodId = parseInt(e.target.value);
    let price: number;
    if (foodId === 0) price = 0;
    else price = foodList.find((x) => x.foodId === foodId)?.price || 0;
    setValue(`foodItems.${index}.price`, price);
    updateTotalPrice(index);
  };

  const updateTotalPrice = (index: number) => {
    const { price, quantity } = getValues(`foodItems.${index}`);
    let totalPrice = 0;
    if (quantity && quantity > 0) totalPrice = price * quantity;
    setValue(`foodItems.${index}.totalPrice`, roundTo2DecimalPoint(totalPrice));
  };

  return (
    <div>
      <h3>Food Items</h3>
      <RenderCount />
      <table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>
              <button type="button" onClick={onRowAdd}>
                Add +
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td>
                <Select
                  options={foodOptions}
                  error={errors.foodItems && errors.foodItems[index]?.foodId}
                  {...register(`foodItems.${index}.foodId` as const, {
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Minimum 1 food item required",
                    },
                    onChange: (e) => {
                      onFoodChange(e, index);
                      trigger(`foodItems.${index}.quantity`);
                    },
                  })}
                />
              </td>
              <td>{getValues(`foodItems.${index}.price`)}</td>
              <td>
                <TextField
                  type="number"
                  min={0}
                  error={errors.foodItems && errors.foodItems[index]?.foodId}
                  {...register(`foodItems.${index}.quantity` as const, {
                    valueAsNumber: true,
                    validate: {
                      notMoreThanStock: async (value: number) => {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );
                        if (value > 9) return "Out of Stock";
                        else return true;
                      },
                    },
                    min: {
                      value: 1,
                      message: "Minimum 1 quantity required",
                    },
                    onChange: () => {
                      updateTotalPrice(index);
                    },
                  })}
                />
              </td>
              <td>{getValues(`foodItems.${index}.totalPrice`)}</td>
              <td>
                <button type="button" onClick={() => onRowDelete(index)}>
                  Delete -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          {fields && fields.length > 0 && (
            <tr className="border-t">
              <td colSpan={2}></td>
              <td>Grand Total</td>
              <td> {"$" + getValues("gTotal")}</td>
            </tr>
          )}
          {errors.foodItems?.root && (
            <tr>
              <td colSpan={5}>{errors.foodItems?.root?.message}</td>
            </tr>
          )}
        </tfoot>
      </table>
      {/* {fields.length > 3 && (
        <button type="button" onClick={onSwapAndMove}>
          Swap and Move
        </button>
      )}
      <button type="button" onClick={onUpdateAndReplace}>
        Update and Replace
      </button> */}
    </div>
  );
};

export default OrderedFoodItems;
