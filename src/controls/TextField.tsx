import React, { ForwardedRef, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: FieldError;
};

const TextField = forwardRef(
  (props: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { type = "text", className, label, error, ...other } = props;

    return (
      <div>
        <input
          type={type}
          className={`form-control ${className}`}
          placeholder={label}
          ref={ref}
          {...other}
        />
        {error && <p className="text-danger">{error.message}</p>}
      </div>
    );
  }
);

export default TextField;
