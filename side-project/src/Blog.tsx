import { A, useParams } from "@solidjs/router";
import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import { useSupabase } from "./supabase";
import showdown from "showdown";

interface Article {
  title: string;
  description: string;
  raw_description: string;
}

interface FullArticle {
  id: number;
  title: string;
  description: string;
  raw_description: string;
  created_at: Date | null;
}

type Mode = "reading" | "editing";

export function Post() {
  const params = useParams();
  const supabase = useSupabase();
  const [title, setTitle] = createSignal("");
  const [raw_description, setRawDescription] = createSignal("");
  const [articles, setArticles] = createSignal<Article[]>([]);
  const [mode, setMode] = createSignal<Mode>("reading");

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
        let raw_description = item.raw_description;
        if (raw_description == null) {
          raw_description = "";
        }
        return { title, raw_description, description };
      });
      setArticles(() => articles);
    }
    console.log({ data, error });
  });

  // Match state
  createEffect(() => {
    articles().forEach((article) => {
      setTitle(article.title);
      setRawDescription(article.raw_description);
    });
  });

  const onClick = async () => {
    if (mode() == "reading") {
      setMode("editing");
    } else if (mode() == "editing") {
      // Support Markdown
      const converter = new showdown.Converter();
      const html = converter.makeHtml(raw_description());
      const options = {
        title: title(),
        description: html,
        raw_description: raw_description(),
      };
      // Send blog post to supabase
      await supabase.from("feed").update(options).eq("id", parseInt(params.id));
      setMode("reading");
    }
  };

  return (
    <div class="bg-gray-800 text-white min-h-screen">
      <div class="mx-auto max-w-lg">
        <div class="p-2">
          <A href="/blog">
            <button class="bg-pink-500 text-white rounded px-4 py-2 font-bold shadow shadow-pink-500/50">
              Home
            </button>
          </A>
        </div>
      </div>
      <For each={articles()}>
        {(article) => (
          <article class="mx-auto max-w-lg pt-12 px-2 flex flex-col gap-8">
            <div class="flex flex-row justify-between">
              <header class="text-xl uppercase tracking-wide text-pink-500">
                {article.title}
              </header>
              <button
                type="button"
                class="text-sm font-semibold bg-pink-500 text-white py-2 px-4 rounded shadow"
                onclick={onClick}
              >
                {mode() === "reading" ? "Edit" : "Save"}
              </button>
            </div>
            <Show
              when={mode() == "reading"}
              fallback={
                <form class="grid gap-4 pt-12 px-2">
                  <div class="grid">
                    <label for="title">Title</label>
                    <input
                      id="title"
                      type="text"
                      class="bg-gray-700 rounded-md"
                      value={title()}
                      oninput={(ev) => setTitle(ev.currentTarget.value)}
                    />
                  </div>
                  <div class="grid">
                    <label for="description">Description</label>
                    <textarea
                      id="description"
                      class="bg-gray-700 resize-y rounded-md"
                      value={raw_description()}
                      oninput={(ev) =>
                        setRawDescription(ev.currentTarget.value)
                      }
                    />
                  </div>
                </form>
              }
            >
              <div class="prose prose-invert">
                {document
                  .createRange()
                  .createContextualFragment(article.description)}
              </div>
            </Show>
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
        raw_description: description(),
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
            value={title()}
            oninput={(ev) => setTitle(ev.currentTarget.value)}
          />
        </div>
        <div class="grid">
          <label for="description">Description</label>
          <textarea
            id="description"
            class="bg-gray-700 resize-y rounded-md"
            value={description()}
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
  const supabase = useSupabase();
  const [articles, setArticles] = createSignal<FullArticle[]>([]);
  onMount(async () => {
    const { data } = await supabase.from("feed").select();
    if (data != null) {
      let articles: FullArticle[] = data.map((item) => {
        let id = item.id;
        if (id == null) {
          id = -1;
        }
        let title = item.title;
        if (title == null) {
          title = "";
        }
        let description = item.description;
        if (description == null) {
          description = "";
        }
        let raw_description = item.raw_description;
        if (raw_description == null) {
          raw_description = "";
        }
        let created_at = null;
        if (item.created_at !== null) {
          created_at = new Date(item.created_at);
        }
        return {
          id,
          title,
          raw_description,
          description,
          created_at,
        };
      });
      setArticles(() => articles);
    }
  });
  return (
    <div class="bg-gray-800 h-screen text-white">
      <div class="md:w-2/3 md:mx-auto px-2">
        <header>
          <h1 class="font-bold text-8xl tracking-wide text-pink-500">Blog</h1>
        </header>
        <div class="mt-12">
          <For
            each={articles()
              .filter((a) => a.created_at !== null)
              .sort((a, b) => b.created_at - a.created_at)}
          >
            {(article) => (
              <div class="flex flex-row justify-between">
                <A href={`/blog/${article.id}`}>
                  <h2 class="font-semibold text-xl cursor-pointer hover:text-pink-500 text-blue-500">
                    {article.title}
                  </h2>
                </A>
                <p class="text-sm text-gray-400">
                  {article.created_at?.toLocaleString()}
                </p>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
