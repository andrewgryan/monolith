import { createEffect, createSignal, Match, Switch } from "solid-js";
import { useStore } from "./store";
import { useSupabase } from "./supabase";
import { Routes, Route, A, useNavigate } from "@solidjs/router";
import { ImSpoonKnife } from "solid-icons/im";
import Ingredient from "./Ingredient";

function App() {
  return (
    <Routes>
      <Route path="/" component={Index} />
      <Route path="/add" component={AddIngredient} />
      <Route path="/ingredient" component={Ingredient} />
    </Routes>
  );
}

const ButtonSignInOut = () => {
  const supabase = useSupabase();
  const [authState, setAuthState] = createSignal("SIGNED_OUT");

  supabase.auth.onAuthStateChange((ev, session) => {
    console.log({ ev, session });
    setAuthState(ev);
  });

  const onSignOut = async () => {
    console.log(await supabase.auth.signOut());
  };
  const onSignIn = async () => {
    console.log(await supabase.auth.signInWithOAuth({ provider: "google" }));
  };

  return (
    <Switch>
      <Match when={authState() === "SIGNED_IN"}>
        <button
          onclick={onSignOut}
          type="button"
          class="bg-gradient-to-r from-indigo-200 to-indigo-100 border-indigo-600 text-indigo-700 text-sm px-4 py-1 rounded-full uppercase tracking-wide shadow shadow-indigo-600/50"
        >
          Sign out
        </button>
      </Match>
      <Match when={authState() === "SIGNED_OUT"}>
        <button
          onclick={onSignIn}
          type="button"
          class="bg-gradient-to-r from-indigo-200 to-indigo-100 border-indigo-600 text-indigo-700 text-sm px-4 py-1 rounded-full uppercase tracking-wide shadow shadow-indigo-600/50"
        >
          Sign in
        </button>
      </Match>
    </Switch>
  );
};

const Index = () => {
  return (
    <>
      <div class="bg-gray-50 h-screen md:grid md:grid-cols-2">
        <div class="absolute top-0 left-0 right-0 flex flex-row justify-end pt-4 pr-4 items-center">
          <ButtonSignInOut />
        </div>
        <div class="h-2/3 md:h-full bg-gray-100 bg-[url('https://source.unsplash.com/wtevVfGYwnM')]"></div>
        <header class="md:grid md:place-items-center">
          <h1 class="text-8xl text-gray-900 p-2">
            <span class="text-9xl">Let's</span>{" "}
            <span class="uppercase font-thin tracking-wide">eat</span>
          </h1>
        </header>
      </div>
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
    </>
  );
};

const AddIngredient = () => {
  const [store, setStore] = useStore();
  const navigate = useNavigate();
  const supabase = useSupabase();

  createEffect(() => {
    console.log(store.name, store.description);
  });
  return (
    <main class="min-h-screen flex flex-col">
      <header class="flex flex-col space-y-8 px-4 py-8 bg-gradient-to-r from-pink-50 to-pink-100">
        <h1 class="text-4xl font-semibold uppercase tracking-wide">
          Add an{" "}
          <span class="text-5xl text-pink-500 font-thin">ingredient</span>
        </h1>
      </header>
      <div class="flex-grow flex flex-col justify-center bg-cover bg-center bg-[url('https://source.unsplash.com/WhcNJfhGiOk')]">
        <form class="flex flex-col space-y-3 mx-4 bg-gray-800/95 text-gray-100 rounded-lg p-2 border-t-4 border-pink-500">
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
              class="rounded appearence-none bg-pink-200 focus:outline-pink-700 text-pink-700 focus:bg-white py-2 px-4 leading-tight"
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
              class="rounded appearence-none bg-pink-200 focus:outline-pink-700 text-pink-700 focus:bg-white py-2 px-4 leading-tight"
              type="text"
            />
          </div>
          <div class="grid grid-cols-2 gap-2 pt-4">
            <button
              type="button"
              class="rounded uppercase tracking-wide text-pink-600 bg-white py-2"
              onclick={() => navigate("/")}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={store.name === ""}
              class={
                store.name === ""
                  ? "rounded uppercase font-semibold tracking-wide bg-pink-300 text-pink-100 py-2"
                  : "rounded uppercase font-semibold tracking-wide bg-pink-500 text-pink-100 py-2"
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
      </div>
    </main>
  );
};

export default App;
