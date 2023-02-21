import { createEffect } from "solid-js";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
import { useStore } from "./store";
import { Routes, Route, A, useNavigate } from "@solidjs/router";
import { ImSpoonKnife } from "solid-icons/im";

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
    <div class="bg-gray-50 h-screen">
      <div class="h-2/3 bg-gray-100 bg-[url('https://source.unsplash.com/wtevVfGYwnM')]">
        <div class="flex flex-row justify-end pt-4 pr-4 items-center">
          <button
            type="button"
            class="bg-gradient-to-r from-indigo-200 to-indigo-100 border-indigo-600 text-indigo-700 text-sm px-4 py-1 rounded-full uppercase tracking-wide shadow shadow-indigo-600/50"
          >
            Sign up
          </button>
        </div>
      </div>
      <header>
        <h1 class="text-8xl text-gray-900 p-2">
          <span class="text-9xl">Let's</span>{" "}
          <span class="uppercase font-thin tracking-wide">eat</span>
        </h1>
      </header>
      <A href="/add">
        <div class="fixed bottom-0 right-0 m-4 cursor-pointer flex flex-col gap-1 items-center">
          <span class="text-sm text-green-500 uppercase tracking-wide">
            Recipes
          </span>
          <ImSpoonKnife
            class="w-16 h-16 p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/50"
            color={"hsl(210deg 20% 98%)"}
          />
        </div>
      </A>
    </div>
  );
};

const AddIngredient = () => {
  const [store, setStore] = useStore();
  const navigate = useNavigate();

  createEffect(() => {
    console.log(store.name, store.description);
  });
  return (
    <main class="min-h-screen bg-cover bg-center bg-[url('https://source.unsplash.com/WhcNJfhGiOk')] flex flex-col justify-around">
      <header class="flex flex-col space-y-8 px-4 py-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent">
        <h1 class="text-5xl font-bold uppercase tracking-wide">
          Add an ingredient
        </h1>
      </header>
      <form class="flex flex-col space-y-3 mx-4 bg-gray-100/75 rounded p-2">
        <div class="flex flex-col space-y-1">
          <label
            for="ingredient"
            class="uppercase tracking-wide font-semibold py-1"
          >
            Ingredient name
          </label>
          <input
            id="ingredient"
            oninput={(ev) => setStore("name", ev.currentTarget.value)}
            class="appearence-none bg-gray-200 focus:outline-gray-700 text-gray-700 focus:bg-white py-2 px-4 leading-tight"
            type="text"
          />
        </div>
        <div class="flex flex-col space-y-1">
          <label
            for="ingredient-description"
            class="uppercase tracking-wide font-semibold"
          >
            Short description
          </label>
          <input
            id="ingredient-description"
            oninput={(ev) => setStore("description", ev.currentTarget.value)}
            class="appearence-none bg-gray-200 focus:outline-gray-700 text-gray-700 focus:bg-white py-2 px-4 leading-tight"
            type="text"
          />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            type="button"
            class="uppercase tracking-wide text-indigo-600 bg-white py-2"
            onclick={() => navigate("/")}
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
    </main>
  );
};

export default App;
