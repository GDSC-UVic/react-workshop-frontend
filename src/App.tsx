import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");

  const fetchUrl = async () => {
    const response = await fetch(import.meta.env.VITE_APP_SHIBA_URL).then(
      (res) => res.json()
    );
    return response[0];
  };

  useEffect(() => {
    const response = fetchUrl();
    response.then((data) => {
      setUrl(data);
    });
  },[]);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
          <img src={url} width={300} alt="Shiba Inu" />
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
