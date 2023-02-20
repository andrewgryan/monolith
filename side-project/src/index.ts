import "./index.css";

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
