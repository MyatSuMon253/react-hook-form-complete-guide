import {
  FieldErrors,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import SubmitButton from "../../controls/SubmitButton";
import { createOrder, fetchLastOrder } from "../../db";
import getRenderCount from "../../hooks/getRenderCount";
import { FoodDeliveryFormType } from "../../types";
import CheckoutForm from "./components/CheckoutForm";
import FoodDeliveryMaster from "./components/MasterFoodDeliveryForm";
import FoodItems from "./components/OrderedFoodItems";

const RenderCount = getRenderCount();

// set to empty value
// const id: number = 0;
// set to last order value
const id: number = 1;

const defaultValues: FoodDeliveryFormType = {
  orderId: 1,
  orderNo: new Date().valueOf(),
  customerName: "Joy",
  mobile: "",
  email: "",
  placedOn: new Date(),
  paymentMethod: "",
  deliveryIn: 0,
  address: {
    streetAddress: "",
    landmark: "",
    city: "",
    state: "",
  },
  foodItems: [{ foodId: 0, price: 0, quantity: 0, totalPrice: 0 }],
  gTotal: 0,
};

const FoodDeliveryForm = () => {
  const methods: UseFormReturn<FoodDeliveryFormType> =
    useForm<FoodDeliveryFormType>({
      mode: "onChange",
      reValidateMode: "onBlur",
      values: (() => {
        if (id === 0) return defaultValues;
        else {
          const tempOrder = fetchLastOrder();
          return tempOrder ? tempOrder : defaultValues;
        }
      })(),
    });

  const { handleSubmit, control, setFocus } = methods;

  /* four types of method overload for watch()
  watch("customerName");
  watch(["address.city", "customerName"]);
  watch();
 // use this callback method whenever changes
  watch((data, { name, type }) => console.log(data, name, type));
  */

  /* passing mobile to 959 as default value and watch
  const mobile = watch('mobile', '959')
  passing default value as an object and watch
  const contact = watch(["mobile",'email'], {mobile: '959', email:'testemail'});
  */

  /* to show alert when payment method is online
  const paymentMethod = watch("paymentMethod");
  useEffect(() => {
    if (paymentMethod === "online") alert("please verify the transaction");
  }, [paymentMethod]);
 */

  /* useEffect with subscription  
  useEffect(() => {
    // (each time any of control changes, this callback will be invoked)
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );

    return () => subscription.unsubscribe();
  }, [watch]);
  */

  const onSubmit = async (formData: FoodDeliveryFormType) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    formData.orderId = 1;
    formData.placedOn = new Date();
    createOrder(formData);
    console.log("submitted form data", formData);
  };

  const onError = (errors: FieldErrors) => {
    console.log("validation errors", errors);
  };

  const onDemo = () => {
    setFocus("mobile", { shouldSelect: true });
  };

  /* 
  console.log(getFieldState("email"));
  const onClickDemo = () => {
    // console.log(getValues()); // pass no value will get all form value
    // console.log(getValues("mobile")); // pass single name
    // console.log(getValues(["customerName", "email"])); // pass multiple name
    // setValue("paymentMethod", "cod");
    setValue("email", "email123", {
      shouldValidate: true, // set value and check validate
      shouldDirty: true, // field state of isDirty is set to true
      shouldTouch: true, // field state of isTouched is set to true
    });
  };
  */

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
        <FoodItems />
        <CheckoutForm />
        {/* <DeliveryAddressForm /> */}
      </FormProvider>
      <button type="button" onClick={onDemo}>
        Demo
      </button>
      <br />
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
