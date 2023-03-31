import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import { useState } from "preact/hooks";

export default function Home() {
  const [links] = useState(["Contact", "About", "RSS"]);
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="bg-gray-100 min-h-screen">
        <nav class="bg-gray-800 text-white py-2 shadow">
          <ul class="flex flex-row pl-4 space-x-4">
            {links.map((link) => (
              <li>{link}</li>
            ))}
          </ul>
        </nav>
        <div class="p-4 mx-auto max-w-screen-md">
          <header>
            <h1 class="text-9xl text-gray-800 tracking-wide py-8">Blog</h1>
          </header>
        </div>
      </div>
    </>
  );
}
