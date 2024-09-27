import { Control, useFormState } from "react-hook-form";
import getRenderCount from "../hooks/getRenderCount";

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  control?: Control<any, any>;
};

const RenderCount = getRenderCount();

const SubmitButton = (props: SubmitButtonProps) => {
  const { className, value, control = undefined, ...other } = props;

  return control ? (
    <WithControl {...{ className, value, control, ...other }} />
  ) : (
    <WithoutControl {...{ className, value, ...other }} />
  );
};

const WithControl = ({className, value, control, ...other} : SubmitButtonProps) => {
  const { isSubmitting } = useFormState({ control });
  
  return (
    <>
      <RenderCount />
      <button
        type="submit"
        className={className}
        disabled={isSubmitting == undefined ? false : isSubmitting}
        {...other}
      >
        {isSubmitting === undefined || isSubmitting === false
          ? value
          : "Submitting"}
      </button>
    </>
  );
};

const WithoutControl = ({className, value, ...other} : SubmitButtonProps) => {
  const { isSubmitting } = useFormState();
  
  return (
    <>
      <RenderCount />
      <button
        type="submit"
        className={className}
        disabled={isSubmitting == undefined ? false : isSubmitting}
        {...other}
      >
        {isSubmitting === undefined || isSubmitting === false
          ? value
          : "Submitting"}
      </button>
    </>
  );
};

export default SubmitButton;
