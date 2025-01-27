import { useFormContext, useFormState } from "react-hook-form";
import TextField from "../../../controls/TextField";
import getRenderCount from "../../../hooks/getRenderCount";
import { DeliveryAddressFormType } from "../../../types";

const RenderCount = getRenderCount();

const DeliveryAddressForm = () => {
  const { register, getFieldState } = useFormContext<{
    address: DeliveryAddressFormType;
  }>();

  const { errors } = useFormState<{ address: DeliveryAddressFormType }>({
    name: ["address"],
    exact: true, // it will need to pass exact same name ['address.streetAddress', 'address.city']
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
      {/* this cannot cause other component to re-render, because it subscribe only to address field */}
      {getFieldState("address").invalid && "address is invalid"}
    </div>
  );
};

export default DeliveryAddressForm;
