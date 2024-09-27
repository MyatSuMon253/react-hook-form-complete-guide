import { Button } from "@nextui-org/react";
import {
  FieldErrors,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import CheckoutForm from "./CheckoutForm";
import TextField from "./controls/TextField";
import getRenderCount from "./hooks/getRenderCount";
import { FoodDeliveryFormType } from "./types";

const RenderCount = getRenderCount();

const FoodDeliveryForm = () => {
  const methods: UseFormReturn<FoodDeliveryFormType> =
    useForm<FoodDeliveryFormType>({
      mode: "onChange",
      reValidateMode: "onBlur",
      defaultValues: {
        orderNo: new Date().valueOf(),
        customerName: "",
        mobile: "",
        email: "",
        paymentMethod: "",
        deliveryIn: 0,
        address: {
          streetAddress: "",
          landmark: "",
          city: "",
          state: "",
        },
      },
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

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
      <FormProvider {...methods}>
        <CheckoutForm />
      </FormProvider>
      <TextField
        label="Street Address"
        {...register("address.streetAddress", {
          required: "This field is required",
        })}
        error={errors.address?.streetAddress}
      />
      <TextField
        label="City"
        {...register("address.city", { required: "This field is required" })}
        error={errors.address?.city}
      />
      <TextField label="Landmark" {...register("address.landmark")} />
      <TextField label="State" {...register("address.landmark")} />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FoodDeliveryForm;
