type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isSubmitting?: boolean;
};

const SubmitButton = (props: SubmitButtonProps) => {
  const { isSubmitting = undefined, className, value, ...other } = props;

  return (
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
  );
};

export default SubmitButton;
