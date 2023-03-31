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

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 50,
          padding: 20,
        }}
      >
        {favoriteCharacterList.map((character) => {
          return (
            <ContainerCards key={character.id}>
              <CardCSS>
                <ImageCharacter
                  src={character.image}
                  alt={character.name}
                  onClick={() => {
                    navigate(`/character/${character.id}`, {
                      state: { urlBack: window.location.pathname.toString() },
                    });
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
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
