import { Button, Input } from "@nextui-org/react";
import { FieldErrors, useForm } from "react-hook-form";
import getRenderCount from "./hooks/getRenderCount";

type FoodDeliveryFormType = {
  orderNo: number;
  customerName: string;
  mobile: string;
  email: string;
};

const RenderCount = getRenderCount();

const FoodDeliveryForm = () => {
  const { register, handleSubmit, formState } = useForm<FoodDeliveryFormType>({
    mode: "onChange",
    defaultValues: {
      orderNo: new Date().valueOf(),
      customerName: "",
      mobile: "",
      email: "",
    },
  });

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log("form data", formData);
  };

  const onError = (errors: FieldErrors) => {
    console.log("validation errors", errors);
  };

  return (
    <form autoComplete="false" onSubmit={handleSubmit(onSubmit, onError)}>
      <RenderCount />
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="#Order No"
          {...register("orderNo")}
          disabled
        />
        <Input
          type="text"
          placeholder="Mobile"
          {...register("mobile", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Minimum 6 digits required",
            },
            maxLength: {
              value: 10,
              message: "Maximum 10 digits allowed",
            },
          })}
        />
        {formState.errors.mobile && (
          <div>{formState.errors.mobile?.message}</div>
        )}
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Customer Name"
          {...register("customerName", {
            required: {
              value: true,
              message: "Customer name is required",
            },
          })}
        />
        <Input
          type="email"
          placeholder="Email"
          {...register("email", {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
              message: "Incorrect email format",
            },
          })}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FoodDeliveryForm;
