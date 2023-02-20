import "./index.css";
import { render } from "solid-js/web";
import App from "./App";

// Solid app
let el = document.getElementById("app");
if (el != null) {
  render(() => <App />, el);
}
