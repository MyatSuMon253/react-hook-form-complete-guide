import { FieldErrors, useForm } from "react-hook-form";

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

const ChangePasswordForm = () => {
  const methods = useForm<FormData>({
    mode: "onChange",
    shouldUseNativeValidation: true,
    values: {
      username: "msm",
      password: "",
      confirmPassword: "",
    },
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
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
      <h3>New User</h3>
      <div>
        <input
          placeholder="Username"
          {...register("username", { required: "field is required" })}
        />
        {errors?.username && <p>{errors.username?.message}</p>}
        <br />
      </div>
      <div>
        <input
          placeholder="Password"
          {...register("password", {
            required: "field is required",
            deps: "confirmPassword",
          })}
        />
        {errors?.password && <p>{errors.password?.message}</p>}
        <br />
      </div>
      <div>
        <input
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            validate: {
              noPasswordMismatch: (value, values) => {
                return value === values.password || "Password do not match.";
              },
            },
          })}
        />
        {errors?.confirmPassword && <p>{errors.confirmPassword?.message}</p>}
        <br />
      </div>
      <input type="submit" value="Sign Up" />
    </form>
  );
};

export default ChangePasswordForm;
