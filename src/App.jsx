import RandomVerse from "./RandomVerse";
import Allverses from "./Allverses";
import SpecificVerse from "./SpecificVerse";
import AddVerse from "./AddVerse";

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

      {/* Random Verse */}
      <RandomVerse />
      <hr style={{ margin: "30px 0", borderColor: "#ccc" }} />

      {/* Add Verse */}
      <AddVerse />
      <hr style={{ margin: "30px 0", borderColor: "#ccc" }} />

      {/* All Verses (Read + Update + Delete) */}
      <Allverses />
      <hr style={{ margin: "30px 0", borderColor: "#ccc" }} />

      {/* Specific Verse */}
      <SpecificVerse />
    </div>
  );
}

export default App;
