import type { VercelRequest, VercelResponse } from "@vercel/node";
import RSS from "rss";
import { createClient } from "@supabase/supabase-js";

export default async function (req: VercelRequest, res: VercelResponse) {
  // Make an RSS data structure
  const feed = new RSS({
    title: "Recipes in the key of code",
    description: "Code, food, travel, life.",
    feed_url: "https://monolith-ashen.vercel.app/feed.xml",
    site_url: "https://monolith-ashen.vercel.app/blog",
    language: "en-us",
    pubDate: "Thu, 23 Feb 2023 08:38:51 GMT",
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
