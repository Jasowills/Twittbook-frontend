import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoverPage from "./pages/Coverpage";
import Message from "./pages/Message";
import Home from "./pages/Home";
import LoadingPage from "./pages/LoadingPage";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoadingPage />} />
          <Route exact path="/auth" element={<CoverPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/message" element={<Message />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
