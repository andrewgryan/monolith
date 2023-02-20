import { Show, For, createResource } from "solid-js";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

// Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

function App() {
  return (
    <main class="grid place-items-center text-indigo-900 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 min-h-screen">
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
              class="appearence-none bg-indigo-200 text-indigo-700 focus:bg-white py-2 px-4 leading-tight"
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
              class="appearence-none bg-indigo-200 text-indigo-700 focus:bg-white py-2 px-4 leading-tight"
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
              class="uppercase font-semibold tracking-wide bg-pink-500 text-pink-100 py-2"
            >
              Add
            </button>
          </div>
        </form>
      </header>
    </main>
  );
}

export default App;
