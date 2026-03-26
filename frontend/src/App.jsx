import { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import "./App.css";

function App() {
  const [activeEndpoint, setActiveEndpoint] = useState(null);

  return (
    <div className="app">
      <Header />
      <div className="body">
        <Navbar onEndpointChange={setActiveEndpoint}/>
        <main className="main">
          <Map activeEndpoint={activeEndpoint} />
        </main>
      </div>
    </div>
  );
}

export default App;