import { useEffect, useState } from "react";

function Allverses() {
  const [verses, setVerses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editVerse, setEditVerse] = useState({ book: "", chapter: "", verse: "", text: "" });

  // Fetch all verses from backend
  const fetchVerses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/verses");
      const data = await res.json();
      setVerses(data);
    } catch (err) {
      console.error("Error fetching verses:", err);
    }
  };

  useEffect(() => {
    fetchVerses();
  }, []);

  // Delete a verse
  const deleteVerse = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/verses/${id}`, { method: "DELETE" });
      fetchVerses(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // Start editing a verse
  const startEdit = (verse) => {
    setEditId(verse.id);
    setEditVerse({
      book: verse.book,
      chapter: verse.chapter,
      verse: verse.verse,
      text: verse.text
    });
  };

  // Handle form changes
  const handleChange = (e) => {
    setEditVerse({ ...editVerse, [e.target.name]: e.target.value });
  };

  // Submit updated verse
  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/verses/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editVerse)
      });
      setEditId(null);
      fetchVerses(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>All Bible Verses</h2>
      {verses.map((v) => (
        <div key={v.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
          {editId === v.id ? (
            <form onSubmit={submitEdit}>
              <input
                name="book"
                value={editVerse.book}
                onChange={handleChange}
                placeholder="Book"
              />
              <input
                name="chapter"
                type="number"
                value={editVerse.chapter}
                onChange={handleChange}
                placeholder="Chapter"
              />
              <input
                name="verse"
                type="number"
                value={editVerse.verse}
                onChange={handleChange}
                placeholder="Verse"
              />
              <input
                name="text"
                value={editVerse.text}
                onChange={handleChange}
                placeholder="Text"
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditId(null)}>
                Cancel
              </button>
            </form>
          ) : (
            <>
              <p>
                {v.book} {v.chapter}:{v.verse} - {v.text}
              </p>
              <button onClick={() => startEdit(v)}>Edit</button>
              <button onClick={() => deleteVerse(v.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Allverses;
