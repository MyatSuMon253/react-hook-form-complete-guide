import { Button, TextField } from "@mui/material";
import { FieldErrors, useForm } from "react-hook-form";

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
    formState: { errors },
  } = methods;

  const onSubmit = (data: FormData) => {
    console.log("form data", data);
  };

  const onError = (err: FieldErrors) => {
    console.log("error", err);
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <TextField variant="outlined" label="Full Name" />
      <TextField variant="outlined" label="Email" />
      <TextField variant="outlined" label="Password" />
      <Button type="submit" variant="contained" color="primary">Sign In</Button>
    </form>
  );
};

export default SignInForm;
