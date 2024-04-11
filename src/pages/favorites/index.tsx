import { Heart } from "@phosphor-icons/react";
import { ICharacter } from "../../interfaces/ICharacter";
import { useNavigate } from "react-router-dom";
import { TitlePage } from "./styled";
import { ButtonCSS } from "../../components/ButtonCSS";
import { useCharacter } from "../../hooks/useCharacter";
import { Card, Divider, Typography } from "antd";
import { useNotify } from "../../hooks/useNotify";

export function Favorites() {
  const { personagensFavoritos, removerFavorito } = useCharacter();
  const { contextholderNotification, openNotification } = useNotify();
  const navigate = useNavigate();

  const handleRemoveCharacter = (character: ICharacter) => {
    removerFavorito(character.id);
    openNotification({
      type: "success",
      message: `Personagem ${character.name} Removido dos favoritos com sucesso!`,
    });
  };

  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "90vh",
      }}
    >
      {contextholderNotification}
      <Typography.Title level={1}>Favoritos</Typography.Title>
      <Divider />

      <div style={{ paddingBottom: 40, paddingLeft: 40 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {personagensFavoritos.map((character) => {
            return (
              <Card
                key={character.id}
                hoverable
                style={{ width: 240 }}
                cover={<img alt={character.name} src={character.image} />}
              >
                <Card.Meta
                  title={character.name}
                  description={
                    <ButtonCSS onClick={() => handleRemoveCharacter(character)}>
                      <Heart
                        size={32}
                        color="#b4211f"
                        weight={
                          personagensFavoritos.find(
                            (value) => value.id === character.id
                          )
                            ? "fill"
                            : "regular"
                        }
                      />
                    </ButtonCSS>
                  }
                />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
