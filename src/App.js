import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import DefaultProject from "./components/DefaultProject/DefaultProject";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";

function App() {
  const [currentSection, setCurrentSection] = React.useState({
    title: "Today",
    type: "default",
    todos: [],
  });

  return (
    <div className="App">
      <BrowserRouter>
        <TopBar currentSectionTitle={currentSection.title} />
        <Routes>
          <Route
            index
            element={<DefaultProject currentSection={currentSection} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
