import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
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
    console.log(formData);
  };

  const onError = (errors: any) => {
    console.log(errors);
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
          {...register("mobile", { required: "Mobile number is required" })}
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
