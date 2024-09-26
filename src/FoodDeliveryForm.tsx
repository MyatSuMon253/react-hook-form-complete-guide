import { Button } from "@nextui-org/react";
import { FieldErrors, useForm } from "react-hook-form";
import TextField from "./controls/TextField";
import getRenderCount from "./hooks/getRenderCount";

type FoodDeliveryFormType = {
  orderNo: number;
  customerName: string;
  mobile: string;
  email: string;
  paymentMethod: string;
  deliveryIn: number;
};

const RenderCount = getRenderCount();

const FoodDeliveryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodDeliveryFormType>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      orderNo: new Date().valueOf(),
      customerName: "",
      mobile: "",
      email: "",
      paymentMethod: "",
      deliveryIn: 0,
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
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FoodDeliveryForm;
