let listener = null;
const signal = (initial) => {
  const fns = new Set();
  let value = initial;
  return new Proxy(
    {
      subscribe: (fn) => fns.add(fn),
    },
    {
      get: (target, name, receiver) => {
        if (name === "data") {
          if (listener) {
            target.subscribe(listener);
          }
          return value;
        }
        return Reflect.get(target, name, receiver);
      },
      set: (target, name, x, ...args) => {
        if (name === "data") {
          value = x;
          fns.forEach((fn) => fn(x));
        }
        return Reflect.set(target, name, x, ...args);
      },
    }
  );
};

const effect = (fn) => {
  listener = fn;
  fn();
  listener = null;
};

// Usage
const s = signal([]);
const t = signal([]);
effect(() => {
  console.log(s.data, s.data, t.data);
});
s.data = [1, 2, 3];
t.data = [42];
