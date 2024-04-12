import { Card } from "antd";
import { ButtonCSS } from "../ButtonCSS";
import { Heart } from "@phosphor-icons/react";
import { ICharacter } from "../../interfaces/ICharacter";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";

export function CardCharacter({
  character,
  favoritesCharacters,
  handleChange,
}: {
  character: ICharacter;
  favoritesCharacters: ICharacter[];
  handleChange: (character: ICharacter) => void;
}) {
  const navigate = useNavigate();

  return (
    <>
      <Card
        key={character.id}
        hoverable
        className={styles["card-container"]}
        cover={
          <img
            alt={character.name}
            src={character.image}
            onClick={() => navigate(`/character/${character.id}`)}
          />
        }
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
