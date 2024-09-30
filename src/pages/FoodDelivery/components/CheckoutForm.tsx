import { useEffect } from "react";
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import Select from "../../../controls/Select";
import getRenderCount from "../../../hooks/getRenderCount";
import { CheckoutFormType, SelectOptionType } from "../../../types";

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

const CheckoutForm = () => {
  const { register } = useFormContext<CheckoutFormType>();

  const { errors } = useFormState<CheckoutFormType>({
    name: ["paymentMethod", "deliveryIn"],
  });

  /* to show alert when payment method is online  */
  const paymentMethod = useWatch({ name: "paymentMethod" });
  useEffect(() => {
    if (paymentMethod === "online") alert("please verify the transaction");
  }, [paymentMethod]);

  return (
    <div>
      <h3>Checkout Information</h3>
      <RenderCount />
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
      />
    </div>
  );
};

export default CheckoutForm;
