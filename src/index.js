import ReactDOM from "react-dom";
//React Router
import { BrowserRouter } from "react-router-dom";
//Context Provider
import { AuthContextProvider } from "./store/auth-context";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);
