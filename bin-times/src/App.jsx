import { container, containerBody, containerHeader, containerH1, nav } from "./App.module.css"
import { newRecipe } from "./App.module.css"
import { TbCarrot } from 'solid-icons/tb'

function Nav() {
  return (
    <ul class={ nav }>
      <li>Recipes</li>
      <li>Ingredients</li>
    </ul>
  );
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
        <header class={ containerHeader }>
          <h1 class={ containerH1 }>Today's recipe</h1>
        </header>
        <NewRecipe />
      </div>
    </div>
  );
}

export default App;
