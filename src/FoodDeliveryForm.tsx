import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
};

const FoodDeliveryForm = () => {
  const { register, handleSubmit } = useForm<FoodDeliveryFormType>();

  const customerControl = register("customerName");

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log(formData);
  };

  const onError = (errors: any) => {
    console.log(errors);
  };

  return (
    <form autoComplete="false" onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <Input
          type="text"
          placeholder="Customer Name"
          name={customerControl.name}
          ref={customerControl.ref}
          onChange={customerControl.onChange}
          onBlur={customerControl.onBlur}
        />
        <Input
          type="text"
          placeholder="Mobile"
          {...register("mobile", { required: "Mobile number is required" })}
        />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default FoodDeliveryForm;
