import { useFormContext, useFormState } from "react-hook-form";
import TextField from "../../../controls/TextField";
import getRenderCount from "../../../hooks/getRenderCount";
import { DeliveryAddressFormType } from "../../../types";

const RenderCount = getRenderCount();

const DeliveryAddressForm = () => {
  const { register } = useFormContext<{ address: DeliveryAddressFormType }>();

  const { errors } = useFormState<{ address: DeliveryAddressFormType }>({
    name: ["address"],
  });

  return (
    <div>
      <h3>Delivery Address</h3>
      <RenderCount />
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
      <TextField label="State" {...register("address.state")} />
    </div>
  );
};

export default DeliveryAddressForm;
