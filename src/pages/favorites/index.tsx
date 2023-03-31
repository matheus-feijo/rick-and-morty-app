import { useDispatch, useSelector } from "react-redux";
import {
  getAllFavoriteCharacters,
  getFavoriteCharactersId,
} from "../../store/reducers/favoriteCharacterSlice";
import { Heart } from "@phosphor-icons/react";
import { favoriteCharacterAction } from "../../store/actions/favoriteCharacterAction";
import { ICharacter } from "../../interfaces/ICharacter";
import { Navbar } from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { TitlePage } from "./styled";
import { ButtonCSS } from "../../components/ButtonCSS";
import { CardCharacter } from "../../components/CardCSS";
import { ImageCharacter } from "../../components/ImageCharacter";
import { ContainerCards } from "../../components/ContainerCards";

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
      <Navbar />

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
              <CardCharacter>
                <ImageCharacter
                  src={character.image}
                  alt={character.name}
                  onClick={() => {
                    navigate(`/character/${character.id}`);
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
                  <h4>
                    <b>{character.name}</b>
                  </h4>

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
              </CardCharacter>
            </ContainerCards>
          );
        })}
      </div>
    </div>
  );
}
