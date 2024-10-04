import { useForm } from "react-hook-form";

type FormData = {
  reason: string;
  otherReason: string;
};

const App = () => {
  const methods = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      reason: "",
      otherReason: "",
    },
  });

  const { register, watch, handleSubmit } = methods;

  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>How did you found us? </h3>
      <label>
        <input type="radio" value="friend" {...register("reason")} />
        Through a friend
      </label>
      <label>
        <input type="radio" value="social_media" {...register("reason")} />
        Through social media
      </label>
      <label>
        <input type="radio" value="ads" {...register("reason")} />
        Through our ads
      </label>
      <label>
        <input type="radio" value="other" {...register("reason")} />
        Other reason
      </label>
      <br />
      {watch("reason") === "other" && (
        <>
          <input placeholder="Please describe" {...register("otherReason")} />
          <br />
        </>
      )}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default App;
