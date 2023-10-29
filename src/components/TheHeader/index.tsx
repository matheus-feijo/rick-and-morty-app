import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { HeaderCSS, NavButtonCSS } from "./styled";

export function TheHeader() {
  const navigate = useNavigate();

  return (
    <HeaderCSS>
      <NavButtonCSS onClick={() => navigate("/")}>
        <span>Início</span>
      </NavButtonCSS>

      <NavButtonCSS onClick={() => navigate("/favoritos")}>
        <span>Favoritos</span>
      </NavButtonCSS>
    </HeaderCSS>
  );
}
