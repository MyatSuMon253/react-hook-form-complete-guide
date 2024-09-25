import { Button, Input } from "@nextui-org/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import getRenderCount from "./hooks/getRenderCount";

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
};

type FoodDeliveryFormErrorType = {
  customerName: string;
  mobile: string;
};

const RenderCount = getRenderCount();

const TypicalForm = () => {
  const [values, setValues] = useState<FoodDeliveryFormType>({
    customerName: "",
    mobile: "",
  });

  const [errors, setErrors] = useState<FoodDeliveryFormErrorType>({
    customerName: "",
    mobile: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validateFormData = () => {
    const newErrors: FoodDeliveryFormErrorType = {
      customerName: "",
      mobile: "",
    };

    if (values.customerName == "") {
      newErrors.customerName = "Customer name is required.";
    }
    if (values.mobile == "") {
      newErrors.mobile = "Mobile number is required.";
    }
    setErrors(newErrors);

    return Object.values(errors).every((x) => x == "");
  };

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateFormData()) {
      console.log(values);
    } else {
      console.log("form is invalid");
    }
  };

  return (
    <form autoComplete="false" onSubmit={onSubmit}>
      <RenderCount />
      <div>
        <Input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={values.customerName}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={values.mobile}
          onChange={handleInputChange}
        />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default TypicalForm;
