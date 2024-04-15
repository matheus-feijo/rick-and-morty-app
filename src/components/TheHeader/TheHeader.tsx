import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { HeartOutlined, HomeOutlined, MenuOutlined } from "@ant-design/icons";

export function TheHeader() {
  const menuSelected = window.location.pathname;
  const navigate = useNavigate();

  return (
    <div>
      <Layout.Header className={styles["header-pc"]}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={
            menuSelected === "/"
              ? ["0"]
              : menuSelected === "/favoritos"
              ? ["1"]
              : [""]
          }
          items={[
            {
              key: 0,
              label: "Inicio",
              title: "Inicio",
              onClick: () => navigate("/"),
              icon: <HomeOutlined />,
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

      <header className={styles["header-mobile"]}>
        <Menu
          style={{
            maxWidth: "200px",
          }}
          theme="dark"
          mode="inline"
          selectedKeys={
            menuSelected === "/"
              ? ["0"]
              : menuSelected === "/favoritos"
              ? ["1"]
              : [""]
          }
          items={[
            {
              key: 10,
              label: <MenuOutlined />,
              title: "Menu",
              style: {
                textAlign: "center",
              },
              children: [
                {
                  key: 0,
                  label: "Inicio",
                  title: "Inicio",
                  onClick: () => navigate("/"),
                  icon: <HomeOutlined />,
                },
                {
                  key: 1,
                  label: "Favoritos",
                  onClick: () => navigate("/favoritos"),
                  icon: <HeartOutlined />,
                },
              ],
            },
          ]}
        />
      </header>
    </div>
  );
}
