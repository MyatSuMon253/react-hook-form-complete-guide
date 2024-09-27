import { useFormContext, useFormState } from "react-hook-form";
import TextField from "../../../controls/TextField";
import getRenderCount from "../../../hooks/getRenderCount";
import { MasterFoodDeliveryFormType } from "../../../types";

const RenderCount = getRenderCount();

const FoodDeliveryMaster = () => {
  const { register } = useFormContext<MasterFoodDeliveryFormType>();

  const { errors } = useFormState<MasterFoodDeliveryFormType>({
    name: ["orderNo", "customerName", "mobile", "email"],
  });

  return (
    <div>
      <h3>Customer Information</h3>
      <RenderCount />
      <TextField label="#Order No" {...register("orderNo")} disabled />
      <TextField label="Mobile" {...register("mobile")} error={errors.mobile} />
      <TextField
        label="Customer Name"
        {...register("customerName", { required: "This field is required" })}
        error={errors.customerName}
      />
      <TextField
        type="email"
        label="Email"
        {...register("email", {
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Incorrect email format",
          },
        })}
        error={errors.email}
      />
    </div>
  );
};

export default FoodDeliveryMaster;
