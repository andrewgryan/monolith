import { useParams } from "@solidjs/router";
import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import { useSupabase } from "./supabase";
import showdown from "showdown";

interface Article {
  title: string;
  description: string;
  raw_description: string;
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
    <div class="bg-gray-800 text-white h-screen">
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
  return <div>Blog</div>;
}
