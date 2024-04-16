import { useEffect, useState } from "react";

type Comment = {
  id: number;
  comment: string;
  author: string;
};

const CommentSection = () => {
  const [url, setUrl] = useState([]);
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

  const postComment = async () => {
    await fetch(import.meta.env.VITE_APP_COMMENTS_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_COMMENTS_API_KEY}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        author: author,
      }),
    })
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
