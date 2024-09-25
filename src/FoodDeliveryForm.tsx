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
  const { register, handleSubmit } = useForm<FoodDeliveryFormType>({
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
            required: true,
            minLength: 6,
            maxLength: 10,
          })}
        />
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Customer Name"
          {...register("customerName")}
        />
        <Input type="email" placeholder="Email" {...register("email")} />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FoodDeliveryForm;
