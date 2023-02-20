import { Show, For, createResource } from "solid-js";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

// Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

type Country = {
  name: string;
};

async function fetchCountries() {
  const { data } = await supabase.from("countries").select();
  if (data != null) {
    return data;
  } else {
    return [];
  }
}

function App() {
  const [countries] = createResource<Country[]>(fetchCountries);

  return (
    <main class="grid place-items-center text-gray-800 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 min-h-screen">
      <header class="flex flex-col space-y-2">
        <h1 class="text-3xl font-bold">Recipe</h1>
        <Show when={!countries.loading} fallback={<div>...</div>}>
          <ul>
            <For each={countries()}>{(country) => <li>{country.name}</li>}</For>
          </ul>
        </Show>
        <form>
          <div class="flex flex-col space-y-1">
            <label
              for="ingredient"
              class="uppercase tracking-wide font-semibold"
            >
              Ingredient
            </label>
            <input
              id="ingredient"
              class="appearence-none bg-gray-200 text-gray-700 focus:bg-white py-2 px-4 leading-tight"
              type="text"
            />
          </div>
        </form>
      </header>
    </main>
  );
}

export default App;
