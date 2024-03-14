import React, { useState } from "react";
import Comment from "../Comment/Comment";

const Comments = () => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      displayText: "Test comment 1",
      like: false,
      dislike: false,
      children: [],
    },
  ]);

  const handleNewComment = (commentInput) => {
    if (commentInput) {
      const newComment = {
        id: new Date().getTime(),
        displayText: commentInput,
        like: false,
        dislike: false,
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
      like: false,
      dislike: false,
      children: [],
    };
  }

  //    Add Reply To Comment
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

  //   Add Reaction To Comment
  const reactToReply = (type, id) => {
    let commentsWithReactToReply = [...comments];
    insertReact(commentsWithReactToReply, type, id);
    setComments(commentsWithReactToReply);
  };
  const insertReact = (comments, type, id) => {
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      if (comment.id === id) {
        if (type === "Like") {
          comment.like = true;
          comment.dislike = false;
        } else if (type === "Dislike") {
          comment.dislike = true;
          comment.like = false;
        } else {
          comment.like = null;
          comment.dislike = null;
        }
      }
    }
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      insertReact(comment.children, type, id);
    }
  };

  //   Edit Existing Comment
  const EditExistingCommentHandler = (editedComment, id) => {
    let commentModified = [...comments];
    insertEditedComment(commentModified, editedComment, id);
    setComments(commentModified);
  };
  const insertEditedComment = (comments, editedComment, id) => {
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      if (comment.id === id) {
        comment.displayText = editedComment;
      }
    }
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      insertEditedComment(comment.children, editedComment, id);
    }
  };

  //   Delete Comments
  const deleteCommentHandler = (id) => {
    let commentModified = [...comments];
    removeComment(commentModified, id);
    setComments(commentModified);
  };
  const removeComment = (comments, id) => {
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      if (comment.id === id) {
        comments.splice(i, 1);
      }
    }
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      removeComment(comment.children, id);
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
          className="bg-green-600 w-[150px] p-3 rounded-lg text-xl"
          onClick={() => handleNewComment(commentInput)}
        >
          Comment
        </button>
      </div>
      <div className="">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              addReply={addReply}
              reactToReply={reactToReply}
              EditExistingCommentHandler={EditExistingCommentHandler}
              deleteCommentHandler={deleteCommentHandler}
            />
          ))
        ) : (
          <div className=" h-[400px] flex items-center justify-center ">
            <span className="font-Poppins text-[30px]">
              No Comment To Show Add Some Comment
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
