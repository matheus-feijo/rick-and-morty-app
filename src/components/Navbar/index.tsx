import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["0"]}
        items={[
          {
            key: 0,
            label: "Home",
            onClick: () => navigate("/"),
          },
          {
            key: 1,
            label: "Favoritos",
            onClick: () => navigate("/favorites"),
          },
        ]}
      />
    </header>
  );
}
