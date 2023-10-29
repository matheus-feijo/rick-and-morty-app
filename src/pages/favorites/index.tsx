import { useDispatch, useSelector } from "react-redux";
import {
  getAllFavoriteCharacters,
  getFavoriteCharactersId,
} from "../../store/reducers/favoriteCharacterSlice";
import { Heart } from "@phosphor-icons/react";
import { favoriteCharacterAction } from "../../store/actions/favoriteCharacterAction";
import { ICharacter } from "../../interfaces/ICharacter";
import { useNavigate } from "react-router-dom";
import { TitlePage } from "./styled";
import { ButtonCSS } from "../../components/ButtonCSS";
import { CardCSS } from "../../components/CardCSS";
import { ImageCharacter } from "../../components/ImageCharacter";
import { ContainerCards } from "../../components/ContainerCards";
import { TextCard } from "../../components/TextCard";
import styles from "./style.module.css";

export function Favorites() {
  const favoriteCharacterList = useSelector(getAllFavoriteCharacters);
  const idsFavoriteCharacterList = useSelector(getFavoriteCharactersId);

  const navigate = useNavigate();
  const appDispatch = useDispatch();
  const { removeFavoriteCharacter } = favoriteCharacterAction;

  const handleRemoveCharacter = (character: ICharacter) => {
    appDispatch(removeFavoriteCharacter(character.id));
  };

  return (
    <div>
      <div style={{ textAlign: "center", paddingTop: 50 }}>
        <TitlePage>Favoritos</TitlePage>
      </div>

      <div className={styles.container}>
        {favoriteCharacterList.map((character) => {
          return (
            <ContainerCards key={character.id}>
              <CardCSS>
                <ImageCharacter
                  src={character.image}
                  alt={character.name}
                  onClick={() => {
                    navigate(`/character/${character.id}`);
                  }}
                />
                <div>
                  <TextCard>
                    <b>{character.name}</b>
                  </TextCard>

                  <ButtonCSS
                    typeCSS="FAVORITE"
                    onClick={() => handleRemoveCharacter(character)}
                  >
                    <Heart
                      size={32}
                      color="#b4211f"
                      weight={
                        idsFavoriteCharacterList.includes(character.id)
                          ? "fill"
                          : "regular"
                      }
                    />
                  </ButtonCSS>
                </div>
              </CardCSS>
            </ContainerCards>
          );
        })}
      </div>
    </div>
  );
}
