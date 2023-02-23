import type { VercelRequest, VercelResponse } from "@vercel/node";
import RSS from "rss";
import { createClient } from "@supabase/supabase-js";

export default async function (req: VercelRequest, res: VercelResponse) {
  // Make an RSS data structure
  const feed = new RSS({
    title: "Andrew Ryan",
    description: "Code, food, travel, life.",
    feed_url: "https://monolith-ashen.vercel.app/feed.xml",
    site_url: "https://monolith-ashen.vercel.app/blog",
    language: "en-us",
    pubDate: new Date(),
  });

  // Create supabase client
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_KEY;
  if (
    typeof supabaseUrl !== "undefined" &&
    typeof supabaseKey !== "undefined"
  ) {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.from("feed").select();
    if (error == null) {
      data.forEach((item) => {
        feed.item({
          title: item.title,
          description: item.description,
          url: "https://monolith-ashen.vercel.app/blog/" + item.id,
          guid: "https://monolith-ashen.vercel.app/blog/" + item.id,
          date: item.created_at,
        });
      });
    }
  }

  const xml = feed.xml({ indent: true });

  // Create XML response
  res.statusCode = 200;
  res.setHeader("Content-type", "text/xml");
  res.end(xml);
}
