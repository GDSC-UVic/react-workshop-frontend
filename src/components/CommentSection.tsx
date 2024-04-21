// This is an optional challenge. Feel free to have fun with it!
// Goal: Fetch comments from an API and display them in a comment section. Allow users to add new comments.
// Steps: 
// 1. We will use the code from section 2.
// 2. Above the useEffect, create a postComment function that will post a new comment to the API. 
// 3. Write your own html form or use the one provided by the club.
import { useEffect, useState } from "react";

type Comment = {
  id: number;
  comment: string;
  author: string;
};

const CommentSection = () => {
  const [url, setUrl] = useState([]);
  // variable to store the comment and author using useState
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");

  const fetchUrl = async () => {
    const response = await fetch(import.meta.env.VITE_APP_COMMENTS_API, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_COMMENTS_API_KEY}`,
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
    return response;
  };

  // Create a postComment function that will post a new comment to the API
  const postComment = async () => {
    await fetch(import.meta.env.VITE_APP_COMMENTS_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_COMMENTS_API_KEY}`,
        "Content-type": "application/json",
      },
      // body is for the data that you want to send to the server
      // body should be a JSON string with the comment and author
      body: JSON.stringify({
        comment: comment,
        author: author,
      }),
    })
      // This code is given to you. It will fetch the comments again after a new comment is posted. This is added in case the API does not return the new comment in the response.
      .then(() => {
        const response = fetchUrl();
        response.then((data) => {
          setUrl(data);
        });
        setComment("");
        setAuthor("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const response = fetchUrl();
    response.then((data) => {
      setUrl(data);
    });
  }, []);

  // You can paste the html given by the club here
  return (
    <div className="comment-section">
      {url.map((comment: Comment) => (
        <div key={comment.id} className="comment">
          <p>
            <strong>{comment.author}</strong>
          </p>
          <p>{comment.comment}</p>
        </div>
      ))}
      <form className="form">
        <label>
          Comment:
          <textarea
          rows={6}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <label>
          Author
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            postComment();
          }}
        >
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
