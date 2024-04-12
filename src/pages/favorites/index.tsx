import { ICharacter } from "../../interfaces/ICharacter";
import { useCharacter } from "../../hooks/useCharacter";
import { Divider, Typography } from "antd";
import { useNotify } from "../../hooks/useNotify";
import { CardCharacter } from "../../components/CardCharacter";

export function Favorites() {
  const { personagensFavoritos, removerFavorito } = useCharacter();
  const { contextholderNotification, openNotification } = useNotify();
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
      <Typography.Title level={1} style={{ color: "#FFFF" }}>
        Favoritos
      </Typography.Title>
      <Divider style={{ backgroundColor: "#FFFF", opacity: 0.2 }} />

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
              <CardCharacter
                key={character.id}
                character={character}
                favoritesCharacters={personagensFavoritos}
                handleChange={handleRemoveCharacter}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
