import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

export function TheHeader() {
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
            defaultSelectedKeys={["0"]}
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
