import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Home } from "../pages/home";
import { Favorites } from "../pages/home/favorites";

export function Routers() {
  return (
    <BrowserRouter>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
    </BrowserRouter>
  );
}
