import { createResource, For, Show } from "solid-js";
import { useSupabase } from "./supabase";

interface Ingredient {
  name: string;
}

export default function Ingredient() {
  const supabase = useSupabase();

  const getIngredients = async () => {
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
  };
  const [ingredients] = createResource<Ingredient[]>(getIngredients);

  return (
    <div class="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Show when={!ingredients.loading} fallback={<div>Loading...</div>}>
        <For each={ingredients()}>
          {(ingredient) => <div>{ingredient.name}</div>}
        </For>
      </Show>
    </div>
  );
}
