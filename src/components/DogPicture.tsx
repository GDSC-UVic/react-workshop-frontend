import { useEffect, useState } from "react";

// GOAL: Create a DogPicture component, to fetch the image URL from the API and render the image.
// STEPS:
// 1. Create a DogPicture component
// 2. Use the useState hook to store the image URL
// 3. Use the useEffect hook to fetch the image URL
// 4. Render the image with the URL

const DogPicture = () => {
  // useState hook to store the image URL
  const [url, setUrl] = useState("");

  // asynchronous function named fetchUrl to fetch the image URL
  // URL is stored in an evironment variable named VITE_APP_SHIBA_URL
  const fetchUrl = async () => {
    const response = await fetch(import.meta.env.VITE_APP_SHIBA_URL).then(
      (res) => res.json()
    );
    // return the image URL
    return response[0];
  };

  // useEffect hook to fetch the image URL
  useEffect(() => {
    const response = fetchUrl();
    response.then((data) => {
      setUrl(data);
    });
  },[]);

  // This is the html that will be rendered
  return (
    <img src={url} width={300} alt="Shiba Inu" />
  )
}

export default DogPicture