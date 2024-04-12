import DogPicture from "./components/DogPicture";
import "./App.css";

function App() {
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <DogPicture />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
