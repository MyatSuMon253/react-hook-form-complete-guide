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
      fullName: "def",
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

  const { ref, ...fullNameRegister } = register("fullName");

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <TextField
        variant="outlined"
        label="Full Name"
        inputRef={ref}
        {...fullNameRegister}
        defaultValue="abc"
      />
      <TextField variant="outlined" label="Email" {...register("email")} />
      <TextField variant="outlined" label="Password" />
      <Button type="submit" variant="contained" color="primary">
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
