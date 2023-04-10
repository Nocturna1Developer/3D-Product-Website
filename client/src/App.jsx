import Home from './pages/Home';
import Canvas from './canvas';
import Customizer from './pages/Customizer';

// Renders the pages if they are typed like this
function App() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas />
      <Customizer />
    </main>
  )
}

export default App
