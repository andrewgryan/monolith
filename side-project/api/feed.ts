import type { VercelRequest, VercelResponse } from "@vercel/node";
import RSS from "rss";

export default function (req: VercelRequest, res: VercelResponse) {
  // Make an RSS data structure
  const feed = new RSS({
    title: "Recipes in the key of code",
    description: "Code, food, travel, life.",
    feed_url: "https://monolith-ashen.vercel.app/feed.xml",
    site_url: "https://monolith-ashen.vercel.app/blog",
    language: "en-us",
    pubDate: "Thu, 23 Feb 2023 08:38:51 GMT",
  });
  feed.item({
    title: "How to RSS",
    description: "RSS basics",
    url: "https://monolith-ashen.vercel.app/blog/1",
    guid: "https://monolith-ashen.vercel.app/blog/1",
    date: "Thu, 23 Feb 2023 08:38:51 GMT",
  });
  const xml = feed.xml({ indent: true });

  // Create XML response
  res.statusCode = 200;
  res.setHeader("Content-type", "text/xml");
  res.end(xml);
}
