import { Routes, Route, A } from "@solidjs/router";
import { container, containerBody, containerHeader, containerH1 } from "./App.module.css"
import { nav, navItem } from "./App.module.css"
import { newRecipe, recipeList, recipe } from "./App.module.css"
import { page, row, primaryButton } from "./App.module.css"
import { TbCarrot, TbFish } from 'solid-icons/tb'
import { FaSolidBowlFood } from 'solid-icons/fa'

function Nav() {
  return (
    <ul class={ nav }>
      <li class={ navItem }><FaSolidBowlFood /><div>Recipes</div></li>
      <li class={ navItem }><TbFish /><span>Ingredients</span></li>
    </ul>
  );
}

function RecipeList() {
  return (
    <div class={ recipeList }>
      <div class={ recipe }>Mon</div>
      <div class={ recipe }>Tue</div>
      <div class={ recipe }>Wed</div>
      <div class={ recipe }>Thurs</div>
      <div class={ recipe }>Fri</div>
    </div>
  )
}

function NewRecipe() {
  return <A href="/add" class={ newRecipe }><TbCarrot /><div>Add recipe</div></A>
}

function Home() {
  return (
    <div class={ container }>
      <Nav />
      <div class={ containerBody }>
        <RecipeList />
        <header class={ containerHeader }>
          <h1 class={ containerH1 }>Today's recipe</h1>
        </header>
        <NewRecipe />
      </div>
    </div>
  );
}


function Page(props) {
  return <div class={ page }>{ props.children }</div>
}

function Add() {
  return (
    <Page>
      <div class={ row }>
        <A href="/" >
          <button class={ primaryButton }>Home</button>
        </A>
      </div>
    </Page>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" component={ Home } />
      <Route path="/add" component={ Add } />
    </Routes>
  );
}

export default App;
