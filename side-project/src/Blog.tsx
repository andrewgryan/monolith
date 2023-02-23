import { useParams } from "@solidjs/router";

export function Post() {
  const params = useParams();
  return (
    <div class="bg-gray-800 text-white h-screen">
      <article class="mx-auto max-w-lg pt-12">
        <header class="text-xl uppercase tracking-wide text-pink-500">
          Post: {params.id}
        </header>
      </article>
    </div>
  );
}

export default function Blog() {
  return <div>Blog</div>;
}
