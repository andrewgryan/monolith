const signal = () => {
  let fns = [];
  let value;
  return {
    sub: (fn) => fns.push(fn),
    set: (x) => {
      value = x;
      fns.map((fn) => fn(x));
    },
    get: () => value,
  };
};

let store = () => {
  let v;
  let fns = [];
  return new Proxy(
    {},
    {
      get: (target, name, receiver) => {
        if (name === "value") {
          console.log("get", target, name, receiver);
          return v;
        } else if (name === "subscribe") {
          return (fn) => fns.push(fn);
        }
      },
      set: (target, name, value) => {
        console.log("set", name, value);
        if (name === "value") {
          v = value;
          fns.map((fn) => fn(v));
        }
        return true;
      },
    }
  );
};

const div = (s) => {
  const el = { innerHTML: "" };
  const update = () => {
    el.innerHTML = s.get();
  };
  s.sub(update);
  update();
  return el;
};

// Main
const s = store();

effect(() => {
  console.log(s);
});

s.value = "Hello, World!";
