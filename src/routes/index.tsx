import { Home } from "../pages/home";
import { Favorites } from "../pages/favorites";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DetailCharacter } from "../pages/detailCharacter";
import { Navbar } from "../components/Navbar";

export function Routers() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/character/:id" element={<DetailCharacter />} />
      </Routes>
    </BrowserRouter>
  );
}
