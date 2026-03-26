import Header from "./components/Header";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="body">
        <Navbar />
        <main className="main">
          {/* Map goes here later */}
        </main>
      </div>
    </div>
  );
}

export default App;