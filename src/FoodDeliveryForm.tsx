import { Button, Input } from "@nextui-org/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
};

const FoodDeliveryForm = () => {
  const [values, setValues] = useState<FoodDeliveryFormType>({
    customerName: "Jenny",
    mobile: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form autoComplete="false" onSubmit={onSubmit}>
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

export default FoodDeliveryForm;
