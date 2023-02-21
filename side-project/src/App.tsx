import { createEffect } from "solid-js";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
import { useStore } from "./store";
import { Routes, Route, A, useNavigate } from "@solidjs/router";
import { BiRegularFork } from "solid-icons/bi";

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
          <BiRegularFork
            class="w-16 h-16 p-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/50"
            color={"hsl(221deg 39% 11%)"}
          />
          <span class="text-sm uppercase tracking-wide">Begin</span>
        </div>
      </A>
    </div>
  );
};

const Plus = () => {
  return (
    <div class="fixed bottom-0 right-0 m-6 cursor-pointer rounded-full shadow-lg shadow-indigo-600/50 h-14 w-14 bg-gradient-to-t from-indigo-600 to-indigo-700 grid place-items-center">
      <div class="relative rounded-full h-1 w-1">
        <div class="absolute -translate-x-2.5 h-1 w-6 bg-indigo-100 rounded rotate-90" />
        <div class="absolute -translate-x-2.5 h-1 w-6 bg-indigo-100 rounded" />
      </div>
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
    <main class="grid place-items-center text-indigo-900 bg-gradient-to-b from-indigo-500 via-indigo-400 to-indigo-500 min-h-screen">
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
              class="appearence-none bg-indigo-200 focus:outline-indigo-700 text-indigo-700 focus:bg-white py-2 px-4 leading-tight"
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
              class="appearence-none bg-indigo-200 focus:outline-indigo-700 text-indigo-700 focus:bg-white py-2 px-4 leading-tight"
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
      </header>
    </main>
  );
};

export default App;
