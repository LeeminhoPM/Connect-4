import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Rank from "./pages/Rank";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/rank" element={<Rank />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
