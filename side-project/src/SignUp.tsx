import { useSupabase } from "./supabase";
import { createSignal } from "solid-js";
import { A } from "@solidjs/router";

export default function SignUp() {
  const supabase = useSupabase();
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const onclick = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email(),
      password: password(),
    });
    console.log({ data, error });
  };

  return (
    <div class="bg-gray-700 h-screen flex flex-col justify-center bg-cover bg-center bg-[url('https://source.unsplash.com/imTYg9Kt6s0')]">
      <form class="bg-gray-800/90 rounded mx-2 p-2 py-4 text-gray-100 flex flex-col gap-4">
        <div class="flex flex-col">
          <label for="email" class="uppercase trcking-wide">
            Email
          </label>
          <input
            type="email"
            id="email"
            oninput={(ev) => setEmail(ev.currentTarget.value)}
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
        >
          Sign up
        </button>
        <div class="flex justify-center">
          <A href="/signin" class="underline">
            Already have an account? Sign in.
          </A>
        </div>
      </form>
    </div>
  );
}
