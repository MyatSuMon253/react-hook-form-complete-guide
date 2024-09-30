import React, { ForwardedRef, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { SelectOptionType } from "../types";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: FieldError;
  options: SelectOptionType[];
};

const Select = forwardRef(
  (props: SelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
    const { className = "", options, error, ...other } = props;

    return (
      <div>
        {/* <label>{label}</label> */}
        <select
          className={`form-control m-1 ${className}`}
          ref={ref}
          {...other}
        >
          {options.map((item, index) => (
            <option
              key={index}
              value={typeof item === "string" ? item : item.value}
            >
              {typeof item === "string" ? item : item.text}
            </option>
          ))}
        </select>
        {error && <p className="text-danger">{error.message}</p>}
      </div>
    );
  }
);

export default Select;
