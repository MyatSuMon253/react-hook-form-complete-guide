import { Button } from "@nextui-org/react";
import { FieldErrors, useForm } from "react-hook-form";
import Select from "./controls/Select";
import TextField from "./controls/TextField";
import getRenderCount from "./hooks/getRenderCount";
import { SelectOptionType } from "./types";

type FoodDeliveryFormType = {
  orderNo: number;
  customerName: string;
  mobile: string;
  email: string;
  paymentMethod: string;
  deliveryIn: number;
};

const paymentOptions: SelectOptionType[] = [
  { value: "", text: "Select" },
  { value: "online", text: "Paid Online" },
  { value: "cod", text: "Cash on Delivery" },
];

const deliveryInOptions: SelectOptionType[] = [
  { value: 0, text: "Select" },
  { value: 30, text: "Half an Hour" },
  { value: 60, text: "1 Hour" },
  { value: 120, text: "2 Hour" },
  { value: 180, text: "3 Hour" },
];

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
      <Select
        label="Payment Method"
        options={paymentOptions}
        {...register("paymentMethod", { required: "This field is required" })}
        error={errors.paymentMethod}
      />
      <Select
        label="Delivery Within"
        options={deliveryInOptions}
        {...register("deliveryIn", { required: "This field is required" })}
        error={errors.deliveryIn}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FoodDeliveryForm;
