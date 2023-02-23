import { useParams } from "@solidjs/router";
import { createSignal, For, onMount } from "solid-js";
import { useSupabase } from "./supabase";
import showdown from "showdown";

interface Article {
  title: string;
  description: string;
}

export function Post() {
  const params = useParams();
  const supabase = useSupabase();
  const [articles, setArticles] = createSignal<Article[]>([]);

  onMount(async () => {
    const { data, error } = await supabase
      .from("feed")
      .select()
      .eq("id", params.id);
    if (data !== null) {
      let articles: Article[] = data.map((item) => {
        let title = item.title;
        if (title == null) {
          title = "";
        }
        let description = item.description;
        if (description == null) {
          description = "";
        }
        return { title, description };
      });
      setArticles(() => articles);
    }
    console.log({ data, error });
  });

  return (
    <div class="bg-gray-800 text-white h-screen">
      <For each={articles()}>
        {(article) => (
          <article class="mx-auto max-w-lg pt-12 px-2 flex flex-col gap-8">
            <header class="text-xl uppercase tracking-wide text-pink-500">
              {article.title}
            </header>
            <div class="prose prose-invert">
              {document
                .createRange()
                .createContextualFragment(article.description)}
            </div>
          </article>
        )}
      </For>
    </div>
  );
}

export function NewPost() {
  const [title, setTitle] = createSignal("");
  const [description, setDescription] = createSignal("");
  const supabase = useSupabase();
  const onSubmit = async () => {
    // Support Markdown
    const converter = new showdown.Converter();
    const html = converter.makeHtml(description());

    // Send blog post to supabase
    await supabase.from("feed").insert([
      {
        title: title(),
        description: html,
      },
    ]);
  };
  return (
    <div class="bg-gray-800 text-white h-screen">
      <header class="grid place-items-center">
        <h1 class="text-3xl tracking-wide font-thin uppercase pt-6">
          New post
        </h1>
      </header>
      <form class="mx-auto max-w-lg grid gap-4 pt-12 px-2">
        <div class="grid">
          <label for="title">Title</label>
          <input
            id="title"
            type="text"
            class="bg-gray-700 rounded-md"
            oninput={(ev) => setTitle(ev.currentTarget.value)}
          />
        </div>
        <div class="grid">
          <label for="description">Description</label>
          <textarea
            id="description"
            class="bg-gray-700 resize-y rounded-md"
            oninput={(ev) => setDescription(ev.currentTarget.value)}
          />
        </div>
        <div class="grid">
          <button
            type="button"
            onclick={onSubmit}
            class="text-xl uppercase tracking-wide bg-pink-500 text-pink-100 rounded-md py-2 shadow shadow-pink-500/50"
            disabled={title() === ""}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Blog() {
  return <div>Blog</div>;
}
