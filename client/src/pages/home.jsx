import { AuthContext } from '@/context/context'

import React, { useContext, useEffect, useState } from 'react'

function HomePage() {
    const {getAllNotes,getSingleNotes,createNote,updateNote,deleteNote,user}= useContext(AuthContext);
    const [notes, setNotes] = useState([])
    const [newNote,setNewNote] = useState({
      name:"",
      description:"",
    })
    const [editId , setEditId] = useState(null)
    
    useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getAllNotes();
        console.log("All Notes:", res.data);
        setNotes(res.data.data)
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };

    fetchNotes();
  }, []);

  const handelSubmit = async (e)=>{
    e.preventDefault();
    try {
      if(editId){
        const res = await updateNote(editId,newNote);
        if (res.data.success) {
        setNotes((prev) =>
          prev.map((note) =>
            note._id === editNoteId ? res.data.data : note
          )
        );
        setEditId(null); 
      }
      }else{
    const res = await createNote(newNote);
      console.log(res.data);
      if(res.data.success){
   
      setNotes((prev)=>[...prev,res.data.data])
      }else{
        alert("error while adding the new note")
      }
    }
     setNewNote({
        name:"",
        description:"",
      })
      
      
    } catch (error) {
console.log("error occored while adding the new note ",error);

    }
  }

  const handeleditnote = (note)=>{
   setNewNote({
    name:note.name,
    description:note.description,
   })
   setEditId(note._id)

  }
  const handelDelete = async(id)=>{
    try {
      const res = await deleteNote(id);
      if(res.data.success){
        setNotes({
          notes:notes.filter((note)=>note._id !== id)

        })
      }
      
    } catch (error) {
      console.log("error while deleting the note ",error);
      alert("error while deleting the note ")
      
    }
  }


  return (
   <div className="min-h-screen w-full bg-gray-100 text-gray-900">
  <header className="flex justify-between items-center border-b px-6 py-4 bg-yellow-300 shadow-md">
    <h1 className="text-2xl md:text-3xl font-extrabold">📝 Notes App</h1>
    <span className="text-lg font-medium text-gray-800">{`Welcome, ${user?.name || 'Guest'}`}</span>
  </header>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
    {/* Notes Section */}
    <div className="md:col-span-2 space-y-4">
      {notes && notes.length > 0 ? (
        notes.map((note) => (
          <div
            key={note._id}
            className="bg-white shadow-sm border rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800">{note.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{note.description}</p>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handeleditnote(note)}
                className="text-blue-600 hover:underline"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handelDelete(note._id)}
                className="text-red-600 hover:underline"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No notes yet 😔</p>
      )}
    </div>

    {/* Form Section */}
    <div className="bg-white shadow-md border rounded-lg p-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-800">
        {editId ? "✏️ Edit Note" : "➕ Add New Note"}
      </h2>
      <form onSubmit={handelSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter note title"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          value={newNote.name}
          onChange={(e) => setNewNote({ ...newNote, name: e.target.value })}
        />
        <textarea
          rows="3"
          placeholder="Enter note description"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
          value={newNote.description}
          onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
        />
        <button
          type="submit"
          className={`text-white font-semibold py-2 rounded ${
            editId ? "bg-blue-600 hover:bg-blue-700" : "bg-amber-500 hover:bg-amber-600"
          }`}
        >
          {editId ? "Update Note" : "Add Note"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setNewNote({ name: "", description: "" });
            }}
            className="text-sm text-red-500 hover:underline"
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  </div>
</div>

  )
}

export default HomePage