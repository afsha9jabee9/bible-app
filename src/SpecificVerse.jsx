import { useState } from "react";

function SpecificVerse() {
  const [input, setInput] = useState("");
  const [verse, setVerse] = useState("");

  const getVerse = async () => {
  if (!input) {
    setVerse("Please enter a valid verse.");
    return;
  }

  try {
    const res = await fetch(
      `https://labs.bible.org/api/?passage=${encodeURIComponent(input)}&type=json`
    );

    // If API responds but status is not 200, treat as invalid
    if (!res.ok) {
      setVerse("Verse not found. Try again.");
      return;
    }

    const data = await res.json();

    // Check if API returned valid verse
    if (!Array.isArray(data) || data.length === 0 || !data[0].text) {
      setVerse("Verse not found. Try again.");
    } else {
      setVerse(`${data[0].bookname} ${data[0].chapter}:${data[0].verse} - ${data[0].text}`);
    }
  } catch (error) {
    // Only show network/server errors here
    setVerse("Error fetching verse. Please check your internet connection.");
  }
};



  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>Get Specific Verse</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. John 3:16"
        style={{
          padding: "6px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "150px"
        }}
      />
      <button
        onClick={getVerse}
        style={{
          padding: "6px 12px",
          marginLeft: "10px",
          cursor: "pointer",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "4px"
        }}
      >
        Get Verse
      </button>
      <p style={{ marginTop: "10px", fontStyle: "italic" }}>{verse}</p>
    </div>
  );
}

export default SpecificVerse;
