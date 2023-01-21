import { container, containerHeader, containerH1 } from "./App.module.css"

function App() {
  return (
    <div class={ container }>
      <header class={ containerHeader }>
        <h1 class={ containerH1 }>Web design</h1>
      </header>
    </div>
  );
}

export default App;
