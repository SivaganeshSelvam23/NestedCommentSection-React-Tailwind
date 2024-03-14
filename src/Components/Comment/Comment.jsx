import React, { useState, useRef } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import Input from "../Input/Input";

const Comment = ({
  comment,
  addReply,
  reactToReply,
  EditExistingCommentHandler,
  deleteCommentHandler,
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editTrigger, setEditTrigger] = useState(false);
  const inputEl = useRef();

  const saveReplyHandler = () => {
    if (replyText) {
      addReply(replyText, comment.id);
      setShowReplyBox(!showReplyBox);
      setReplyText("");
    } else {
      alert("Please add some comment and submit...");
    }
  };

  const editedCommentSave = (editedComment, id) => {
    EditExistingCommentHandler(editedComment, id);
  };

  const deleteComment = (id) => {
    deleteCommentHandler(id);
  };

  const reacthandler = (type, id) => {
    reactToReply(type, id);
  };

  return (
    <>
      <div className="w-[500px] bg-neutral-800 p-5 mt-5 ml-5 rounded-md shadow-md flex flex-col gap-4 font-Poppins">
        {editTrigger ? (
          <Input
            setEditTrigger={setEditTrigger}
            comment={comment.displayText}
            id={comment.id}
            editedCommentSave={editedCommentSave}
          />
        ) : (
          <div className="flex justify-between items-top">
            <div className="text-[25px] w-[200px]">{comment.displayText}</div>
            <div className="flex gap-5 mt-2">
              <span
                className="text-green-500 cursor-pointer"
                onClick={() => setEditTrigger(true)}
              >
                Edit
              </span>
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => deleteComment(comment.id)}
              >
                Delete
              </span>
            </div>
          </div>
        )}

        <div>
          {showReplyBox ? (
            <div className="flex gap-3 items-center">
              <input
                className=" w-[300px] h-[30px] text-black p-2 rounded-lg text-[12px] "
                type="text"
                placeholder="Enter reply comment..."
                ref={inputEl}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <span
                className="text-[15px] cursor-pointer hover:text-green-500"
                onClick={() => saveReplyHandler()}
              >
                save
              </span>
              <span
                className="text-[15px] cursor-pointer hover:text-red-500"
                onClick={() => {
                  setShowReplyBox(!showReplyBox);
                }}
              >
                cancel
              </span>
            </div>
          ) : (
            <div className="flex gap-5 justify-end items-center">
              <div
                className=" w-[30px] h-[30px] p-1 flex justify-center items-center cursor-pointer"
                onClick={() => {
                  console.log("inside");
                  reacthandler("Like", comment.id);
                }}
              >
                <AiOutlineLike
                  size={20}
                  fill={comment.like ? "green" : "white"}
                />
              </div>
              <div
                className="w-[30px] h-[30px] p-1 flex justify-center items-center cursor-pointer"
                onClick={() => {
                  console.log("inside");
                  reacthandler("Dislike", comment.id);
                }}
              >
                <AiOutlineDislike
                  size={20}
                  fill={comment.dislike ? "red" : "white"}
                />
              </div>
              <span
                className="text-[15px] cursor-pointer hover:text-green-500"
                onClick={() => setShowReplyBox(!showReplyBox)}
              >
                Reply
              </span>
            </div>
          )}
        </div>
      </div>
      {comment.children.length > 0 && (
        <div className="ml-10">
          {comment.children.map((childComment) => (
            <Comment
              key={childComment.id}
              comment={childComment}
              addReply={addReply}
              reactToReply={reactToReply}
              EditExistingCommentHandler={EditExistingCommentHandler}
              deleteCommentHandler={deleteCommentHandler}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Comment;
