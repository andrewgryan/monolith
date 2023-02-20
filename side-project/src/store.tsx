import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";

type Schema = { name: string; description: string };

const makeContext = () => {
  const [store, setStore] = createStore<Schema>({ name: "", description: "" });
  return [store, setStore] as const;
};

type ContextType = ReturnType<typeof makeContext>;
const StoreContext = createContext<ContextType>(makeContext());

export const Store: ParentComponent = (props) => {
  return (
    <StoreContext.Provider value={makeContext()}>
      {props.children}
    </StoreContext.Provider>
  );
};

export function useStore() {
  return useContext(StoreContext);
}
