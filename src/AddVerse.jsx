import { useState } from "react";

function AddVerse({ onAdded }) {
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setStatus("Adding...");
    try {
      const res = await fetch("http://localhost:5000/api/verses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book,
          chapter: Number(chapter),
          verse: Number(verse),
          text
        })
      });

      if (!res.ok) throw new Error("Failed to add");

      const added = await res.json();
      setBook(""); setChapter(""); setVerse(""); setText("");
      setStatus("Added!");
      if (typeof onAdded === "function") onAdded(added);
      setTimeout(() => setStatus(""), 1500);
    } catch (err) {
      console.error(err);
      setStatus("Error adding verse");
    }
  };

  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <h3>Add a New Verse</h3>
      <form onSubmit={submitHandler} style={{ display: "inline-block", textAlign: "left" }}>
        <div style={{ marginBottom: 8 }}>
          <label>Book</label><br />
          <input value={book} onChange={(e) => setBook(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Chapter</label><br />
          <input value={chapter} onChange={(e) => setChapter(e.target.value)} required type="number" />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Verse</label><br />
          <input value={verse} onChange={(e) => setVerse(e.target.value)} required type="number" />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Text</label><br />
          <textarea value={text} onChange={(e) => setText(e.target.value)} required rows="3" cols="30" />
        </div>
        <div style={{ textAlign: "center" }}>
          <button type="submit" style={{ padding: "6px 12px" }}>Add Verse</button>
        </div>
      </form>

      <div style={{ marginTop: 8, minHeight: 20 }}>
        <small>{status}</small>
      </div>
    </div>
  );
}

export default AddVerse;
