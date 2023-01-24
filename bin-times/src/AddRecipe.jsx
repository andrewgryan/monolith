import { createEffect, For } from "solid-js";
import { createStore } from "solid-js/store";
import { A } from "@solidjs/router";
import { addRecipeForm, ingredient } from "./App.module.css";
import { page, row, primaryButton } from "./App.module.css";
import "./AddRecipe.css";

function Page(props) {
  return <div class={page}>{props.children}</div>;
}

function Add() {
  const [store, setStore] = createStore({
    tags: [
      { id: "Vegetarian", label: "Vegetarian" },
      { id: "Meat", label: "Meat" },
      { id: "Pasta", label: "Pasta" },
    ],
    ingredients: [
      { id: "steak", label: "Steak", tags: ["meat"] },
      { id: "salmon", label: "Salmon", tags: ["fish"] },
      { id: "potato", label: "Potato", tags: ["vegetable"] },
    ],
    categories: [
      { id: "bread", label: "Bread" },
      { id: "meat", label: "Meat" },
      { id: "vegetable", label: "Vegetable" },
    ],
    recipe: {
      name: "Soup",
      ingredients: ["Carrot", "Potato", "Stock cube"],
      tags: [],
    },
  });
  return (
    <Page>
      <div class={row}>
        <A href="/">
          <button class={primaryButton}>Home</button>
        </A>
      </div>
      <form class={addRecipeForm}>
        <AddRecipe store={store} setStore={setStore} />
        <fieldset class={ingredient}>
          <legend>Add an ingredient</legend>
          <label for="label">Name:</label>
          <input id="label" name="label" type="text" />
          <label for="category">Category:</label>
          <select id="category" name="category">
            <For each={store.categories}>
              {(category) => {
                return <option value={category.id}>{category.label}</option>;
              }}
            </For>
          </select>
        </fieldset>
        <button class={primaryButton} type="submit">
          Submit
        </button>
      </form>
    </Page>
  );
}

function AddRecipe(props) {
  const store = props.store;
  const setStore = props.setStore;
  const onText = (ev) => {
    setStore({ recipe: { name: ev.target.value } });
  };

  createEffect(() => {
    console.log(store.recipe.name);
  });

  const toggle = (ev) => {
    console.log(ev.target.value, ev.target.checked);
  };

  return (
    <fieldset class={ingredient}>
      <legend>Recipe</legend>
      <label for="label">Name:</label>
      <input
        oninput={onText}
        id="label"
        name="label"
        type="text"
        value={store.recipe.name}
      />

      <label for="tag">Tag(s):</label>
      <div class="grid grid-cols-2">
        <For each={store.tags}>
          {(tag) => {
            return (
              <div class="flex gap-2 items-center">
                <input
                  oninput={toggle}
                  type="checkbox"
                  id={tag.id}
                  value={tag.id}
                />
                <label for={tag.id}>{tag.label}</label>
              </div>
            );
          }}
        </For>
      </div>

      <label for="ingredients">Ingredients:</label>
      <ul>
        <For each={store.recipe.ingredients}>
          {(ingredient) => {
            return <li>{ingredient}</li>;
          }}
        </For>
      </ul>
    </fieldset>
  );
}

export default Add;
