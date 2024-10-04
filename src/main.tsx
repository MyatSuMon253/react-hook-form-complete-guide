import { NextUIProvider } from "@nextui-org/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UserRegistrationForm from "./UserRegistrationForm";
// import App from "./FoodDeliveryApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      {/* <App /> */}
      <UserRegistrationForm />
    </NextUIProvider>
  </StrictMode>
);
