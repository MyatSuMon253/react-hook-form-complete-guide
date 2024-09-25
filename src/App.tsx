import "./App.css";
import FoodDeliveryForm from "./FoodDeliveryForm";
import TypicalForm from "./TypicalForm";

function App() {
  return (
    <>
      <div className="container">
        <h3>Food Delivery App</h3>
        <TypicalForm />
        <FoodDeliveryForm />
      </div>
    </>
  );
}

export default App;
