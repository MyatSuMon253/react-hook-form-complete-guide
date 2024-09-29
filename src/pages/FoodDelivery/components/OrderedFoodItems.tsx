import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import TextField from "../../../controls/TextField";
import getRenderCount from "../../../hooks/getRenderCount";
import { OrderedFoodItemType } from "../../../types";

const RenderCount = getRenderCount();

const OrderedFoodItems = () => {
  const { register } = useFormContext<{
    foodItems: OrderedFoodItemType[];
  }>();

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
  }>({ name: "foodItems" });

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

 

  return (
    <div>
      <h3>Food Items</h3>
      <RenderCount />
      <table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Quantity</th>
            {/* <th>Price</th>
            <th>Total Price</th> */}
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
                <TextField
                  {...register(`foodItems.${index}.name` as const, {
                    required: "This field is required",
                  })}
                  error={errors.foodItems && errors.foodItems[index]?.name}
                />
              </td>
              <td>
                <TextField
                  {...register(`foodItems.${index}.quantity` as const, {
                    required: "This field is required",
                  })}
                  error={errors.foodItems && errors.foodItems[index]?.quantity}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {fields.length > 3 && (
        <button type="button" onClick={onSwapAndMove}>
          Swap and Move
        </button>
      )}
    </div>
  );
};

export default OrderedFoodItems;
