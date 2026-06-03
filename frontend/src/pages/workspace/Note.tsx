import React, { useEffect, useState } from 'react'
import NoteItem from '../../components/notes/NoteItem'
import NoteForm from '../../components/notes/NoteForm'
import { deleteNote, fetchNotes } from '../../features/notes/noteSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

const Note: React.FC = () => {
    const dispatch = useAppDispatch();
    const { notes, loading, error, message } = useAppSelector((state) => state.note);
    const [showMessage, setShowMessage] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    useEffect(() => {
        if(message) {
            setShowMessage(message);
        }
        const timer = setTimeout(()=> {
            setShowMessage(null);
        },1500);
        return () => clearTimeout(timer);
    },[message]);

    const handleDelete = (id: string) => {
        dispatch(deleteNote(id));
    };

    if (loading) return <p className="text-green-500">Loading...</p>;
    if (error) return <p className="text-red-500">Something went wrong</p>

    return (
        <div className="bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                <h1 className="text-xl text-blue-600 font-semibold mb-4">Leave Your Notes</h1>
                {showMessage && (
                    <p className='text-center text-blue-500'>{showMessage}</p>
                )}
                <NoteForm />
                <div className="mt-4">
                    {notes.length === 0 ? (
                        <p className="text-center text-gray-400">No Note yet.</p>
                    ) : (
                        notes.map((note) => (
                            <NoteItem key={note._id} note={note} handleDelete={handleDelete} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Note