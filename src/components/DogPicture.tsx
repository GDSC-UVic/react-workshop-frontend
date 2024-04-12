import { useEffect, useState } from "react";

const DogPicture = () => {
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
    <img src={url} width={300} alt="Shiba Inu" />
  )
}

export default DogPicture