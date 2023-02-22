import { useSupabase } from "./supabase";

export default function LoginWithGoogle() {
  const supabase = useSupabase();

  const onclick = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log({ data, error });
  };

  return (
    <button
      type="button"
      class="uppercase tracking-wide bg-pink-500 py-2 rounded"
      onclick={onclick}
    >
      Sign in with Google
    </button>
  );
}
