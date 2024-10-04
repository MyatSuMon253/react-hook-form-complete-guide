import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  reason: string;
  otherReason: string;
};

const App = () => {
  const methods = useForm<FormData>({
    mode: "onChange",
    shouldUnregister: true,
    defaultValues: {
      reason: "",
      otherReason: "",
    },
  });

  const { register, watch, handleSubmit, unregister } = methods;

  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };

  const reasonValue = watch("reason");

  useEffect(() => {
    if (reasonValue !== "other") {
      unregister("otherReason");
    }
  }, [reasonValue, unregister]);

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
