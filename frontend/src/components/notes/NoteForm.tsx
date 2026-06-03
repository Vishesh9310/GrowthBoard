import React, { useState } from "react";
import type { NoteInput } from "../../features/notes/noteType";
import { createNote } from "../../features/notes/noteSlice";
import { useAppDispatch } from "../../app/hooks";

const NoteForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const handleAdd = () => {
    const data: NoteInput = { title: text, desc: desc };
    if (text.trim()) {
      dispatch(createNote(data));
      setText("");
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <div className="w-fit space-y-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your note title"
          className="flex-grow px-4 py-1 border rounded-lg"
          required
        />
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter your note description"
          className="flex-grow px-4 py-1 border rounded-lg"
          required
        />
      </div>
      <button
        onClick={handleAdd} // ✅ fixed
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add
      </button>
    </div>
  );
};

export default NoteForm;
