import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/index.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "./context";
import "../public/css/tailwind.css";
// import { Provider } from "react-redux";
// import store from "./services/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <MaterialTailwindControllerProvider>
        {/* <Provider store={store}> */}
          <AppRouter />
        {/* </Provider> */}
      </MaterialTailwindControllerProvider>
    </ThemeProvider>
  </React.StrictMode>
);
