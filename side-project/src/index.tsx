import "./index.css";
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "./App";
import { Store } from "./store";

// Solid app
let el = document.getElementById("app");
if (el != null) {
  render(
    () => (
      <Store>
        <Router>
          <App />
        </Router>
      </Store>
    ),
    el
  );
}
