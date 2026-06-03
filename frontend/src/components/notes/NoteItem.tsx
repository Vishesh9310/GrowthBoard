import React from "react";
import type { Note } from "../../features/notes/noteType";

type NoteItemProps = {
  note: Note;
  handleDelete: (id: string) => void;
};

const NoteItem: React.FC<NoteItemProps> = ({ note, handleDelete }) => {
  return (
    <div className="flex flex-col bg-white shadow-md p-3 rounded-md my-2">
      <p className="font-semibold">{note.title}</p>
      {note.desc && <p className="text-gray-500 text-sm mt-1">{note.desc}</p>}
      <button
        onClick={() => handleDelete(note._id)}
        className="self-end text-red-500 hover:text-red-700 text-sm mt-2"
      >
        Delete
      </button>
    </div>
  );
};

export default NoteItem;