import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

import { Outlet } from "react-router-dom";
import { Popup } from "./components/templates/Popup";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <Footer />
      <Popup />
    </div>
  );
}

export default App;
