import {
  FieldErrors,
  FormProvider,
  useForm,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import SubmitButton from "../../controls/SubmitButton";
import { fetchLastOrder } from "../../db";
import getRenderCount from "../../hooks/getRenderCount";
import { FoodDeliveryFormType } from "../../types";
import FormLoader from "../common/FormLoader";
import CheckoutForm from "./components/CheckoutForm";
import FoodDeliveryMaster from "./components/MasterFoodDeliveryForm";
import FoodItems from "./components/OrderedFoodItems";

const RenderCount = getRenderCount();

// set to empty value
const id: number = 0;
// set to last order value
// const id: number = 1;

const initialValues: FoodDeliveryFormType = {
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
      shouldUnregister: true,
      reValidateMode: "onBlur",
      defaultValues: async (): Promise<FoodDeliveryFormType> => {
        if (id === 0) return new Promise((resolve) => resolve(initialValues));
        else {
          const tempOrder = await fetchLastOrder();
          return new Promise((resolve) =>
            resolve(tempOrder ? tempOrder : initialValues)
          );
        }
      },
    });

  const {
    handleSubmit,
    control,
    setFocus,
    unregister,
    resetField,
    reset,
    setError,
    clearErrors,
    formState: { defaultValues },
  } = methods;

  console.log(useWatch({ control }));
  console.log(defaultValues);
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
    setError(
      "email",
      { type: "duplicateEmail", message: "The email already taken" },
      { shouldFocus: true }
    );
    // createOrder(formData);
    console.log("submitted form data", formData);
  };

  const onError = (errors: FieldErrors) => {
    console.log("validation errors", errors);
  };

  const onDemo = () => {
    // setFocus("mobile", { shouldSelect: true });
    // unregister from the form but re-rendering and register again
    // unregister("customerName");
  };

  const onReset = () => {
    // reset particular field and set to default value
    // resetField("email", {keepError: true, defaultValue: 'abc@outlook.com'});

    // reset the entire form data and form state
    // reset(initialValues, { keepValues: true, keepErrors: true });

    // reset(initialValues, { keepDirtyValues: true });

    // clearErrors();
    clearErrors('email')
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
      <FormLoader control={control} />
      {/* <p>Submit Count:{submitCount}</p> */}
      <FormProvider {...methods}>
        <FoodDeliveryMaster />
        <FoodItems />
        <CheckoutForm />
        {/* <DeliveryAddressForm /> */}
      </FormProvider>
      <button type="button" onClick={onReset}>
        Reset
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
