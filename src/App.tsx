import DogPicture from "./components/DogPicture";
import "./App.css";
import CommentSection from "./components/CommentSection";

function App() {
  return (
    <>
      <h1>Vite + React</h1>
        <DogPicture />
        <h2>Comment Section</h2>
        <CommentSection />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
