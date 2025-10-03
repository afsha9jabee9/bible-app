import { useState } from "react";

function RandomVerse() {
  const [verse, setVerse] = useState("");

  const getRandomVerse = async () => {
    const res = await fetch("https://labs.bible.org/api/?passage=random&type=json");
    const data = await res.json();
    setVerse(`${data[0].bookname} ${data[0].chapter}:${data[0].verse} - ${data[0].text}`);
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

