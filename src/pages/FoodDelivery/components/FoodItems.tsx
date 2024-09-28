import { useFormContext, useFormState } from "react-hook-form";
import TextField from "../../../controls/TextField";
import getRenderCount from "../../../hooks/getRenderCount";

const RenderCount = getRenderCount();

const FoodItems = () => {
  const { register } = useFormContext<{
    foodItems: { name: string }[];
  }>();

  const { errors } = useFormState<{
    foodItems: { name: string }[];
  }>({ name: "foodItems" });

  return (
    <div>
      <h3>Food Items</h3>
      <RenderCount />
      <table>
        <tbody>
          <tr>
            <td>
              <TextField
                label="Food 1"
                {...register("foodItems.0.name", {
                  required: "This field is required",
                })}
                error={errors.foodItems && errors.foodItems[0]?.name}
              />
            </td>
          </tr>
          <tr>
            <td>
              <TextField
                label="Food 2"
                {...register("foodItems.1.name", {
                  required: "This field is required",
                })}
                error={errors.foodItems && errors.foodItems[1]?.name}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FoodItems;
