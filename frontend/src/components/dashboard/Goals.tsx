import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchNotes } from '../../features/notes/noteSlice';

const Goals: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notes, loading, error } = useAppSelector(state => state.note);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      {notes.length > 0 ? (
        notes.map((note, i) => (
          <p key={i} className="mb-2 border-b italic border-gray-300 pb-1">
            {note.title}
          </p>
        ))
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  )
};

export default Goals;