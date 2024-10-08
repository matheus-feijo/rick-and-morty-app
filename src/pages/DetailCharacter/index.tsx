import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { apiService } from "../../services/api";
import { Button, Divider, Result, Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

export function DetailCharacter() {
  const { id } = useParams();

  const { data: character, status } = useQuery({
    queryKey: ["single-character"],
    queryFn: () => apiService.getUniqueCharacter(parseInt(id || "")),
    cacheTime: 0,
  });

  if (status === "loading" || status === "idle") {
    return (
      <div className={styles["container-loading"]}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 96 }} spin />} />
      </div>
    );
  } else if (status === "success") {
    return (
      <div>
        <Typography.Title
          style={{ textAlign: "center", paddingTop: 20, color: "#FFFF" }}
        >
          {character.name}
        </Typography.Title>
        <Divider style={{ backgroundColor: "#FFFF", opacity: 0.2 }} />

        <div className={styles["container-info"]}>
          <img
            src={character.image}
            alt={character.name}
            style={{ borderRadius: "4px" }}
          />

          <Typography style={{ color: "#FFFF" }}>
            Especie: {character.species}
          </Typography>
          <Typography style={{ color: "#FFFF" }}>
            Status: {character.status}
          </Typography>
          <Typography style={{ color: "#FFFF" }}>
            Genero: {character.gender}
          </Typography>
          <Typography style={{ color: "#FFFF" }}>
            Episodios: {character.episode.length}
          </Typography>
        </div>

        <div className={styles["container-info"]} style={{ paddingTop: 20 }}>
          <Button onClick={() => history.go(-1)}>Voltar</Button>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ padding: "20px 0px 0px 20px" }}>
        <Result
          status="error"
          title="Erro ao Buscar informaçoes do Personagem"
          subTitle="Por favor tente novamente mais tarde"
          extra={<Button onClick={() => history.go(-1)}>Voltar</Button>}
        />
      </div>
    );
  }
}
