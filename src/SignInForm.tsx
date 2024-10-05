import { Button } from "@mui/material";
import { FieldErrors, useForm } from "react-hook-form";
import MUITextField from "./controls/MUITextField";

type FormData = {
  fullName: string;
  email: string;
  password: string;
};

const SignInForm = () => {
  const methods = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: FormData) => {
    console.log("form data", data);
  };

  const onError = (err: FieldErrors) => {
    console.log("error", err);
  };

  // const { ref, ...fullNameRegister } = register("fullName");

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <MUITextField
        name="fullName"
        label="Full Name"
        control={control}
        rules={{ required: "This field is required" }}
      />
      <MUITextField
        name="email"
        label="Email"
        control={control}
        rules={{
          required: "This field is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Incorrect email format",
          },
        }}
      />
      <MUITextField
        name="password"
        label="Password"
        type="password"
        control={control}
        rules={{ required: "This field is required" }}
      />
      <Button type="submit" variant="contained" color="primary">
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
