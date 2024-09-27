import { Button } from "@nextui-org/react";
import {
  FieldErrors,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import getRenderCount from "../../hooks/getRenderCount";
import { FoodDeliveryFormType } from "../../types";
import CheckoutForm from "./components/CheckoutForm";
import DeliveryAddressForm from "./components/DeliveryAddressForm";
import FoodDeliveryMaster from "./components/FoodDeliveryMaster";

const RenderCount = getRenderCount();

const FoodDeliveryForm = () => {
  const methods: UseFormReturn<FoodDeliveryFormType> =
    useForm<FoodDeliveryFormType>({
      mode: "onChange",
      reValidateMode: "onBlur",
      defaultValues: {
        orderNo: new Date().valueOf(),
        customerName: "Joy",
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
    handleSubmit,
    formState: { dirtyFields, touchedFields, isValid, isValidating },
  } = methods;

  const onSubmit = (formData: FoodDeliveryFormType) => {
    console.log("form data", formData);
  };

  const onError = (errors: FieldErrors) => {
    console.log("validation errors", errors);
  };

  console.log("dirty", dirtyFields);
  console.log("touched", touchedFields);
  console.log("valid", isValid);
  console.log("validating", isValidating);

  return (
    <form autoComplete="false" onSubmit={handleSubmit(onSubmit, onError)}>
      <RenderCount />
      <FormProvider {...methods}>
        <FoodDeliveryMaster />
        <CheckoutForm />
        <DeliveryAddressForm />
      </FormProvider>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FoodDeliveryForm;
