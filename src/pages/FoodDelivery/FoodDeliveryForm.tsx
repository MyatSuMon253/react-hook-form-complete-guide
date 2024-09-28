import { useEffect } from "react";
import {
  FieldErrors,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import SubmitButton from "../../controls/SubmitButton";
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

  const { handleSubmit, control, watch } = methods;

  // watch("customerName");
  // watch(["address.city", "customerName"]);
  // watch();
  // use this callback method whenever changes
  // watch((data, { name, type }) => console.log(data, name, type));

  // passing mobile to 959 as default value and watch
  // const mobile = watch('mobile', '959')

  // passing default value as an object and watch
  // const contact = watch(["mobile",'email'], {mobile: '959', email:'testemail'});
  // console.log("mob", contact);

  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    if (paymentMethod === "online") alert("please verify the transaction");
  }, [paymentMethod]);

  const onSubmit = async (formData: FoodDeliveryFormType) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("form data", formData);
  };

  const onError = (errors: FieldErrors) => {
    console.log("validation errors", errors);
  };

  // console.log('is dirty', isDirty)
  // console.log("dirty fields", dirtyFields);
  // console.log("touched fields", touchedFields);
  // console.log("is valid", isValid);
  // console.log("validating", isValidating);
  // console.log("is submitting", isSubmitting);
  // console.log("is submitted", isSubmitted);
  // console.log("is submit successful", isSubmitSuccessful);

  return (
    <form autoComplete="false" onSubmit={handleSubmit(onSubmit, onError)}>
      <RenderCount />
      {/* <p>Submit Count:{submitCount}</p> */}
      <FormProvider {...methods}>
        <FoodDeliveryMaster />
        <CheckoutForm />
        <DeliveryAddressForm />
      </FormProvider>
      <SubmitButton value="Submit" control={control} />
      {/* get field state from parent can cause other child component to be rerendered
      move this code to related child component */}
      {/* {getFieldState("address").invalid && "address is invalid"}  */}

      {/* this can cause other component to re-render, because it subscribe the whole form */}
      {/* {getFieldState("address", formState).isTouched && "address is touched"} */}
    </form>
  );
};

export default FoodDeliveryForm;
