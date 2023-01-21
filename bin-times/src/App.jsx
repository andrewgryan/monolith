import { container, containerHeader, containerH1 } from "./App.module.css"

function App() {
  return (
    <div class={ container }>
      <header class={ containerHeader }>
        <h1 class={ containerH1 }>Bin collection times</h1>
      </header>
    </div>
  );
}

export default App;
