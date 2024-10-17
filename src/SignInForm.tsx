import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import MUITextField from "./controls/MUITextField";

// type FormData = {
//   fullName: string;
//   email: string;
//   password: string;
// };

const schema = z.object({
  fullName: z.string().min(1, "This field is required"),
  email: z.string().email("Incorrect email format"),
  password: z
    .string()
    .min(6, "Minimum 6 characters required")
    .max(12, "Can't exceed 12 characters"),
});

type FormData = z.infer<typeof schema>;

const SignInForm = () => {
  const methods = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control } = methods;

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
        // rules={{
        //   required: "This field is required",
        //   pattern: {
        //     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        //     message: "Incorrect email format",
        //   },
        // }}
      />
      <MUITextField
        name="password"
        label="Password"
        type="password"
        control={control}
        // rules={{ required: "This field is required" }}
      />
      <Button type="submit" variant="contained" color="primary">
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
