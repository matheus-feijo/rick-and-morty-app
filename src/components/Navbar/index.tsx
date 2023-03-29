import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={[
          {
            key: 0,
            label: "Favorites",
            onClick: () => navigate("/favorites"),
          },
          {
            key: 1,
            label: "Home",
            onClick: () => navigate("/"),
          },
        ]}
      />
    </header>
  );
}
