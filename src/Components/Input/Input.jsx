import React, { useState } from "react";

const Input = ({ setEditTrigger, comment, editedCommentSave, id }) => {
  const [editComment, setEditComment] = useState(comment);

  return (
    <div className="flex gap-3 items-center">
      <input
        className=" w-[300px] h-[30px] text-black p-2 rounded-lg text-[12px] "
        type="text"
        value={editComment}
        onChange={(e) => setEditComment(e.target.value)}
        placeholder="Edit comment..."
      />
      <span
        className="text-[15px] cursor-pointer hover:text-green-500"
        onClick={() => {
          editedCommentSave(editComment, id);
          setEditTrigger(false);
        }}
      >
        save
      </span>
      <span
        className="text-[15px] cursor-pointer hover:text-red-500"
        onClick={() => setEditTrigger(false)}
      >
        cancel
      </span>
    </div>
  );
};

export default Input;
