import { HashRouter } from "react-router-dom";
import App from "./App";
import "./style.css";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
