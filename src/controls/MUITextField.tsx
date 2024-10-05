import { TextField, TextFieldProps } from "@mui/material";
import {
  Control,
  Controller,
  RegisterOptions,
  useController,
} from "react-hook-form";

type MUITextFieldType = {
  variant?: "filled" | "outlined" | "standard";
} & Omit<TextFieldProps, "variant" | "name"> & {
    name: string;
    control: Control<any, any>;
    shouldUnregister?: boolean;
    rules?: Pick<
      RegisterOptions<any, string>,
      | "required"
      | "minLength"
      | "maxLength"
      | "min"
      | "max"
      | "validate"
      | "pattern"
    >;
  };

export const MUITextFieldWithComponent = (props: MUITextFieldType) => {
  const {
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
    disabled,
    variant = "outlined",
    ...otherProps
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      disabled={disabled}
      render={({ field, fieldState }) => (
        <TextField
          variant={variant}
          {...field}
          inputRef={field.ref}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
          {...otherProps}
        />
      )}
    />
  );
};

export const MUITextField = (props: MUITextFieldType) => {
  const {
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
    disabled,
    variant = "outlined",
    margin = "normal",
    ...otherProps
  } = props;

  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    disabled,
  });

  return (
    <TextField
      variant={variant}
      margin={margin}
      {...field}
      inputRef={field.ref}
      error={fieldState.invalid}
      helperText={fieldState.error?.message}
      {...otherProps}
    />
  );
};

export default MUITextField;
