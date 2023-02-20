import "./index.css";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

supabase
  .from("countries")
  .select()
  .then(({ data }) => console.log(data));

// Geometry
interface Point {
  x: number;
  y: number;
}

const add = (p: Point): number => {
  return p.x + p.y;
};

export default function HelloWorld(): number {
  return add({ x: 1, y: 1 });
}

let el = document.getElementById("app");
if (el != null) {
  el.appendChild(document.createTextNode("VanillaJS"));
}
