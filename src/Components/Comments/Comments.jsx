import React, { useState } from "react";
import Comment from "../Comment/Comment";

const Comments = () => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      displayText: "Test comment 1",
      children: [],
    },
  ]);

  const handleNewComment = (commentInput) => {
    if (commentInput) {
      const newComment = {
        id: new Date().getTime(),
        displayText: commentInput,
        children: [],
      };

      setComments([newComment, ...comments]);
      setCommentInput("");
    } else {
      alert("Please add some comment and submit...");
    }
  };

  function newComment(text) {
    return {
      id: new Date().getTime(),
      displayText: text,
      children: [],
    };
  }

  const addReply = (replyText, commentId) => {
    let commentsWithNewReply = [...comments];
    insertComment(commentsWithNewReply, commentId, replyText);
    setComments(commentsWithNewReply);
  };

  const insertComment = (comments, parentId, text) => {
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      if (comment.id === parentId) {
        comment.children.unshift(newComment(text));
      }
    }
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      insertComment(comment.children, parentId, text);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-5 justify-center">
        <input
          className="w-4/5 text-black p-3 rounded-lg"
          type="text"
          placeholder="Enter some comment here..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button
          className="bg-green-800 w-[150px] p-3 rounded-lg text-xl"
          onClick={() => handleNewComment(commentInput)}
        >
          Comment
        </button>
      </div>
      <div className="">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} addReply={addReply} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
