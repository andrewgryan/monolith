import { createSignal, createEffect, For } from "solid-js";
import { createClient } from "@supabase/supabase-js";
// Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [countries, setCountries] = createSignal([]);

  createEffect(() => {
    getCountries();
  });

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }
  return (
    <main class="grid place-items-center bg-gray-100 min-h-screen">
      <header>
        <h1 class="text-3xl font-bold underline">Solid JS!</h1>
        <ul>
          <For each={countries()}>{(country) => <li>{country.name}</li>}</For>
        </ul>
      </header>
    </main>
  );
}

export default App;
