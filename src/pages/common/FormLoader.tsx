import { useFormState } from "react-hook-form";

const FormLoader = (props: any) => {
  const { control } = props;
  const { isLoading } = useFormState({ control });

  return isLoading === false || <div>Loading...</div>;
};

export default FormLoader;
