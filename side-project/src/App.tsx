import { createEffect } from "solid-js";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
import { useStore } from "./store";
import { Routes, Route } from "@solidjs/router";

// Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

function App() {
  return (
    <Routes>
      <Route path="/" component={Index} />
      <Route path="/add" component={AddIngredient} />
    </Routes>
  );
}

const Index = () => {
  return (
    <div class="bg-blue-100 text-gray-100 h-screen">
      <div class="h-1/2 bg-blue-200 -skew-y-6 translate-y-12"></div>
    </div>
  );
};

const AddIngredient = () => {
  const [store, setStore] = useStore();

  createEffect(() => {
    console.log(store.name, store.description);
  });
  return (
    <main class="grid place-items-center text-indigo-900 bg-gradient-to-b from-purple-500 via-purple-400 to-purple-500 min-h-screen">
      <header class="flex flex-col space-y-8">
        <h1 class="text-3xl font-bold uppercase tracking-wide">
          Add an ingredient
        </h1>
        <form class="text-indigo-900 flex flex-col space-y-3">
          <div class="flex flex-col space-y-1">
            <label
              for="ingredient"
              class="uppercase tracking-wide font-semibold"
            >
              Ingredient name
            </label>
            <input
              id="ingredient"
              oninput={(ev) => setStore("name", ev.currentTarget.value)}
              class="appearence-none bg-purple-200 focus:outline-purple-700 text-purple-700 focus:bg-white py-2 px-4 leading-tight"
              type="text"
            />
          </div>
          <div class="flex flex-col space-y-1">
            <label
              for="ingredient-description"
              class="uppercase tracking-wide font-semibold"
            >
              Description
            </label>
            <input
              id="ingredient-description"
              oninput={(ev) => setStore("description", ev.currentTarget.value)}
              class="appearence-none bg-purple-200 focus:outline-purple-700 text-purple-700 focus:bg-white py-2 px-4 leading-tight"
              type="text"
            />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button
              type="button"
              class="uppercase tracking-wide text-indigo-600 bg-white py-2"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={store.name === ""}
              class={
                store.name === ""
                  ? "uppercase font-semibold tracking-wide bg-pink-300 text-pink-100 py-2"
                  : "uppercase font-semibold tracking-wide bg-pink-500 text-pink-100 py-2"
              }
              onclick={async () => {
                const { data, error } = await supabase
                  .from("ingredients")
                  .insert([
                    {
                      name: store.name,
                      description: store.description,
                    },
                  ]);
                console.log({ data, error });
              }}
            >
              Add
            </button>
          </div>
        </form>
      </header>
    </main>
  );
};

export default App;
