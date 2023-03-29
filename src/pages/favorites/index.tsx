import { useDispatch, useSelector } from "react-redux";
import {
  CardCharacter,
  ContainerCards,
} from "../../components/characters/styled";
import {
  getAllFavoriteCharacters,
  getFavoriteCharactersId,
} from "../../store/reducers/favoriteCharacterSlice";
import { ArrowLeft, Heart } from "@phosphor-icons/react";
import { favoriteCharacterAction } from "../../store/actions/favoriteCharacterAction";
import { ICharacter } from "../../interfaces/ICharacter";
import { Navbar } from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

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
      <div style={{ padding: "20px 0px 0px 20px" }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: 5,
            backgroundColor: "#ffff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          {" "}
          <ArrowLeft size={32} /> Voltar
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        {favoriteCharacterList.map((character) => {
          return (
            <ContainerCards key={character.id}>
              <CardCharacter>
                <img
                  src={character.image}
                  alt={character.name}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log(character);
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

                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
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
                  </button>
                </div>
              </CardCharacter>
            </ContainerCards>
          );
        })}
      </div>
    </div>
  );
}
