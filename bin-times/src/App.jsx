import { container, containerBody, containerHeader, containerH1 } from "./App.module.css"
import { nav, navItem } from "./App.module.css"
import { newRecipe, recipeList, recipe } from "./App.module.css"
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
  const onClick = () => {
    alert("Recipe");
  }
  return <div class={ newRecipe } onclick={onClick}><TbCarrot /><div>Add recipe</div></div>
}

function App() {
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

export default App;
