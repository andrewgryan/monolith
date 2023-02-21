import { createResource, For, Show } from "solid-js";
// import { useSupabase } from "./supabase";

interface Ingredient {
  name: string;
}

export default function Ingredient() {
  // const supabase = useSupabase();

  const getIngredients = async () => {
    return [];
    /**
    const { data } = await supabase.from("ingredients").select();
    console.log(data);
    if (data == null) {
      return [];
    } else {
      return data.map((d) => {
        if (d.name == null) {
          return { name: "" };
        } else {
          return { name: d.name };
        }
      });
    }
    */
  };
  const [ingredients] = createResource<Ingredient[]>(getIngredients);

  return (
    <div class="min-h-screen bg-cover bg-center bg-[url('https://source.unsplash.com/0ZGzu8J69kY')]">
      <header class="bg-gradient-to-r from-orange-50 to-orange-100">
        <h1 class="uppercase tracking-wide py-4 px-6">
          <span class="text-5xl font-thin text-orange-500">Ingredients</span>{" "}
          <span class="text-3xl text-orange-700 tracking-widest">List</span>
        </h1>
      </header>
      <Show when={!ingredients.loading} fallback={<div>Loading...</div>}>
        <For each={ingredients()}>
          {(ingredient) => <div>{ingredient.name}</div>}
        </For>
      </Show>
    </div>
  );
}
