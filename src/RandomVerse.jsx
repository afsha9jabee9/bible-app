import { useState } from "react";

function RandomVerse() {
  const [verse, setVerse] = useState("");

  const getRandomVerse = async () => {
    try {
      // Fetch from local backend
      const res = await fetch("http://localhost:5000/api/verses");
      const data = await res.json();

      // Pick a random verse from the array
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomVerse = data[randomIndex];

      // Set the verse to display
      setVerse(`${randomVerse.book} ${randomVerse.chapter}:${randomVerse.verse} - ${randomVerse.text}`);
    } catch (err) {
      console.error("Error fetching verse:", err);
      setVerse("Failed to load verse.");
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>Random Bible Verse</h2>
      <button
        onClick={getRandomVerse}
        style={{
          padding: "8px 16px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px"
        }}
      >
        Get Random Verse
      </button>
      <p style={{ marginTop: "10px", fontStyle: "italic" }}>{verse}</p>
    </div>
  );
}

export default RandomVerse;
