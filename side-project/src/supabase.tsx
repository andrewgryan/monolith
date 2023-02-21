import { createContext, useContext, ParentComponent } from "solid-js";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseClient = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  return createClient<Database>(supabaseUrl, supabaseKey);
};

type ContextType = ReturnType<typeof supabaseClient>;
const SupabaseContext = createContext<ContextType>(supabaseClient());

export const Supabase: ParentComponent = (props) => {
  return (
    <SupabaseContext.Provider value={supabaseClient()}>
      {props.children}
    </SupabaseContext.Provider>
  );
};

export function useSupabase() {
  return useContext(SupabaseContext);
}
