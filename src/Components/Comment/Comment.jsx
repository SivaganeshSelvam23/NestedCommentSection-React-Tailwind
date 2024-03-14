import React, { useState, useRef } from "react";

const Comment = ({ comment, addReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
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
  return (
    <>
      <div className="w-[500px] bg-neutral-800 p-5 mt-5 ml-5 rounded-md shadow-md flex flex-col gap-4 font-Poppins">
        <div className="text-[25px]">{comment.displayText}</div>
        <div>
          {showReplyBox ? (
            <div className="flex gap-3  items-center">
              <input
                className=" w-[300px] h-[30px] text-black p-2 rounded-lg text-[12px] "
                type="text"
                placeholder="Enter reply comment..."
                ref={inputEl}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <span
                className="text-[12px] cursor-pointer hover:text-green-500"
                onClick={() => saveReplyHandler()}
              >
                save
              </span>
              <span
                className="text-[12px] cursor-pointer hover:text-red-500"
                onClick={() => {
                  setShowReplyBox(!showReplyBox);
                }}
              >
                cancel
              </span>
            </div>
          ) : (
            <span
              className="text-[12px] cursor-pointer hover:text-green-500"
              onClick={() => setShowReplyBox(!showReplyBox)}
            >
              Reply
            </span>
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
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Comment;
