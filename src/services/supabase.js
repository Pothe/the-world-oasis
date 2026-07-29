import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pkkudhwvfssawcdjzwpe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBra3VkaHd2ZnNzYXdjZGp6d3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MTY1MzQsImV4cCI6MjA4MDQ5MjUzNH0.Oeic1SVokSLM-RV3sfdo9qoza6RmpdO6WvvisM0t_xQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
