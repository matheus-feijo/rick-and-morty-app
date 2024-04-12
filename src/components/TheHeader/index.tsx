import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

export function TheHeader() {
  const menuSelected = window.location.pathname;
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "80%" }}>
        <Layout.Header>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={
              menuSelected === "/"
                ? ["0"]
                : menuSelected === "/favoritos"
                ? ["1"]
                : ["0"]
            }
            items={[
              {
                key: 0,
                label: "Inicio",
                title: "Inicio",
                onClick: () => navigate("/"),
                // icon: <HomeOutlined />,
              },
              {
                key: 1,
                label: "Favoritos",
                onClick: () => navigate("/favoritos"),
                // icon: <HomeOutlined />,
              },
            ]}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Layout.Header>
      </div>
    </div>
  );
}
