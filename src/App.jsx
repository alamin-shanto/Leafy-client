import { Toaster } from "react-hot-toast";
import "./App.css";
import Router from "./Routes/Router";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Router />
    </>
  );
}

export default App;
