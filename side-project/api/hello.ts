import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function (req: VercelRequest, res: VercelResponse) {
  res.statusCode = 200;
  res.setHeader("Content-type", "text/xml");

  const xml = `<?xml version="1.0"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
   <channel>
      <title>Recipes in the key of code</title>
      <link>https://monolith-ashen.vercel.app/blog</link>
      <description>Code, food, travel, life.</description>
      <language>en-us</language>
      <pubDate>Thu, 23 Feb 2023 08:38:51 GMT</pubDate>
      <lastBuildDate>Thu, 23 Feb 2023 08:38:51 GMT</lastBuildDate>
      <atom:link href="https://monolith-ashen.vercel.app/feed.xml" rel="self" type="application/rss+xml" />
      <item>
         <title>How to RSS</title>
         <link>https://monolith-ashen.vercel.app/blog/1</link>
         <guid>https://monolith-ashen.vercel.app/blog/1</guid>
         <description>RSS basics</description>
         <pubDate>Thu, 23 Feb 2023 08:38:51 GMT</pubDate>
      </item>
   </channel>
</rss>`;

  res.end(xml);
}
