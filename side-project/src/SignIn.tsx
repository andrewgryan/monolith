import { useSupabase } from "./supabase";
import { createSignal, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";

export default function SignIn() {
  const navigate = useNavigate();
  const supabase = useSupabase();
  const [processing, setProcessing] = createSignal(false);
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const onclick = async () => {
    setProcessing(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email(),
      password: password(),
    });
    if (error != null) {
      setProcessing(false);
    } else {
      navigate("/");
    }
    console.log({ data, error });
  };

  const onSignOut = async () => {
    setProcessing(true);
    const { error } = await supabase.auth.signOut();
    console.log({ error });
    setProcessing(false);
  };

  return (
    <div class="bg-gray-700 h-screen flex flex-col justify-center bg-cover bg-center bg-[url('https://source.unsplash.com/imTYg9Kt6s0')]">
      <form class="relative bg-gray-800/90 rounded mx-2 p-2 py-4 text-gray-100 flex flex-col gap-4 overflow-hidden">
        <h2 class="text-2xl uppercase text-pink-500 text-center">
          Sign in to see recipes
        </h2>
        <div class="flex flex-col">
          <label for="email" class="uppercase trcking-wide">
            Email
          </label>
          <input
            type="email"
            id="email"
            oninput={(ev) => setEmail(ev.currentTarget.value)}
            class="text-pink-500"
          />
        </div>
        <div class="flex flex-col">
          <label for="password" class="uppercase tracking-wide">
            Password
          </label>
          <input
            type="password"
            id="password"
            oninput={(ev) => setPassword(ev.currentTarget.value)}
            class="text-pink-500"
          />
        </div>
        <button
          type="button"
          class="uppercase tracking-wide bg-pink-500 py-2 rounded"
          onclick={onclick}
          disabled={processing()}
        >
          Sign in
        </button>
        <button
          type="button"
          class="uppercase tracking-wide bg-pink-500 py-2 rounded"
          onclick={onSignOut}
        >
          Sign out
        </button>
        <div class="flex justify-center">
          <A href="/signup" class="underline">
            Need an account? Sign up.
          </A>
        </div>

        <Show when={processing()}>
          <div class="absolute inset-0 bg-gray-900/80 grid place-items-center">
            <div class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <div class="text-2xl">Processing</div>
            </div>
          </div>
        </Show>
      </form>
    </div>
  );
}
