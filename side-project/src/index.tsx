import "./index.css";
import { createClient } from "@supabase/supabase-js";
import { render } from "solid-js/web";
import Vanilla from "./App";

// Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

supabase
  .from("countries")
  .select()
  .then(({ data }) => console.log(data));

// Solid app
let el = document.getElementById("app");
if (el != null) {
  render(() => <Vanilla />, el);
}
