import { Home } from "../pages/home";
import { Favorites } from "../pages/favorites";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DetailCharacter } from "../pages/DetailCharacter";
import { TheHeader } from "../components/TheHeader";
import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/pt_BR";

export function Routers() {
  return (
    <BrowserRouter>
      <ConfigProvider locale={locale}>
        <TheHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/character/:id" element={<DetailCharacter />} />
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
}
