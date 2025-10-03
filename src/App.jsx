import RandomVerse from "./RandomVerse";
import SpecificVerse from "./SpecificVerse";

function App() {
  return (
    <div style={{
      textAlign: "center",
      marginTop: "40px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f9",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h1 style={{ color: "#333" }}>Bible Verse App</h1>
      <RandomVerse />
      <hr style={{ margin: "30px 0", borderColor: "#ccc" }} />
      <SpecificVerse />
    </div>
  );
}

export default App;
