import { useEffect, useState } from "react";

type Comment = {
  id: number;
  comment: string;
  author: string;
};

const CommentSection = () => {
  const [url, setUrl] = useState([]);

  const fetchUrl = async () => {
    const response = await fetch(import.meta.env.VITE_APP_COMMENTS_API, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_COMMENTS_API_KEY}`,
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
    return response;
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
          <p><strong>{comment.author}</strong></p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
