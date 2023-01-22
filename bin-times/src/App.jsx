import { container, containerBody, containerHeader, containerH1, nav } from "./App.module.css"
import { newRecipe } from "./App.module.css"
import { TbCarrot } from 'solid-icons/tb'

function Nav() {
  return <div class={ nav }>Nav</div>
}


function NewRecipe() {
  return <div class={ newRecipe }><TbCarrot /><div>Add recipe</div></div>
}

function App() {
  return (
    <div class={ container }>
      <Nav />
      <div class={ containerBody }>
        <header class={ containerHeader }>
          <h1 class={ containerH1 }>Recipe finder</h1>
        </header>
        <NewRecipe />
      </div>
    </div>
  );
}

export default App;
