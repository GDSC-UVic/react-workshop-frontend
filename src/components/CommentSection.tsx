// Goal: Display comments from an API
// Steps:
// 1. Create a Comment type with id, comment and author fields
// 2. Create a CommentSection to fetch comments from an API and display them
// 3. Add headers to authenticate the API request
// 4. Write an html to display the comments using the map() function
// 5. Add the component to the App component


import { useEffect, useState } from "react";

// Comment type is an object with id, comment and author fields
type Comment = {
  id: number;
  comment: string;
  author: string;
};

// CommentSection component fetches comments from an API and displays them
const CommentSection = () => {
  // This is a useState hook where url is an array of Comment objects
  const [url, setUrl] = useState([]);

  // fetchUrl function fetches comments from an API
  // Same as the DogPicture component. The difference is the headers are added to authenticate the API request
  const fetchUrl = async () => {
    const response = await fetch(import.meta.env.VITE_APP_COMMENTS_API, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_COMMENTS_API_KEY}`,
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
    return response;
  };

  // Same as the useEffect in DogPicture component
  useEffect(() => {
    const response = fetchUrl();
    response.then((data) => {
      setUrl(data);
    });
  }, []);

  // map() function is used to iterate over the url array and display the comments
  return (
    <div className="comment-section">
      {url.map((comment: Comment) => (
        <div key={comment.id} className="comment">
          <p><strong>{comment.author}</strong></p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
