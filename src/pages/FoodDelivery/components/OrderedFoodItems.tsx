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

  const { fields } = useFieldArray<{
    foodItems: OrderedFoodItemType[];
  }>({ name: "foodItems" });

  return (
    <div>
      <h3>Food Items</h3>
      <RenderCount />
      <table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td>
                <TextField
                  label="Food 1"
                  {...register(`foodItems.${index}.name` as const, {
                    required: "This field is required",
                  })}
                  error={errors.foodItems && errors.foodItems[index]?.name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderedFoodItems;
