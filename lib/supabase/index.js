const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

//TODO:Hay que ver como cambiar esto
const connectionUser = async () => {
  await supabase.auth.signInWithPassword({
    email: "ale@ldn.com",
    password: "321321",
  });
};

connectionUser();

module.exports = { supabase };
