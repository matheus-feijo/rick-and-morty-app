import { Card } from "antd";
import { ButtonCSS } from "../ButtonCSS";
import { Heart } from "@phosphor-icons/react";
import { ICharacter } from "../../interfaces/ICharacter";

export function CardCharacter({
  character,
  favoritesCharacters,
  handleChange,
}: {
  character: ICharacter;
  favoritesCharacters: ICharacter[];
  handleChange: (character: ICharacter) => void;
}) {
  return (
    <>
      <Card
        key={character.id}
        hoverable
        style={{ width: 240 }}
        cover={<img alt={character.name} src={character.image} />}
      >
        <Card.Meta
          title={character.name}
          description={
            <ButtonCSS onClick={() => handleChange(character)}>
              <Heart
                size={32}
                color="#b4211f"
                weight={
                  favoritesCharacters.find((value) => value.id === character.id)
                    ? "fill"
                    : "regular"
                }
              />
            </ButtonCSS>
          }
        />
      </Card>
    </>
  );
}
