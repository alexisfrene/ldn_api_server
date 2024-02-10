import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);

// TODO: Hay que ver cómo cambiar esto
const connectionUser = async () => {
  await supabase.auth.signInWithPassword({
    email: "ale@ldn.com",
    password: "321321",
  });
};

connectionUser();

export { supabase };
