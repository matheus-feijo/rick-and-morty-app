import { useQuery } from "react-query";
import { ICharacter } from "../../../../interfaces/ICharacter";
import { IDadosCharacters } from "../../../../interfaces/IDadosCharacters";
import { api } from "../../../../services/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../../../../store/reducers/characterSlice";
import { characterAction } from "../../../../store/actions/characterAction";
import { getFavoriteCharactersId } from "../../../../store/reducers/favoriteCharacterSlice";
import { Heart } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { ButtonCSS } from "../../../../components/ButtonCSS";
import { CardCharacter } from "../../../../components/CardCSS";
import { ContainerCards, ImageCharacter } from "./styled";

interface ICharacterAPI {
  info: IDadosCharacters;
  results: ICharacter[];
}

export function Characters({
  pageSelect,
  handleChangeNextList,
  handleChangePrevList,
  handleFavoriteCharacter,
}: {
  pageSelect: string;
  handleChangeNextList: () => void;
  handleChangePrevList: () => void;
  handleFavoriteCharacter: (character: ICharacter, action: string) => void;
}) {
  const appDispatch = useDispatch();
  const characterList = useSelector(getCharacters);
  const idsFavoriteCharacter = useSelector(getFavoriteCharactersId);
  const navigate = useNavigate();
  const { addCharacters } = characterAction;

  const { status, refetch } = useQuery<ICharacterAPI, unknown>({
    queryFn: () => api.get(`/character/${pageSelect}`).then((res) => res.data),
    queryKey: "personagens",
    onSuccess: (data) => {
      appDispatch(addCharacters(data));
    },
  });

  useEffect(() => {
    refetch();
  }, [pageSelect]);

  if (status === "error") {
    return <p>Error</p>;
  }

  if (status === "loading") {
    return (
      <div
        style={{
          marginTop: 50,
        }}
      >
        Carregando...
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        {characterList.items.results.map((character) => {
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
                    onClick={() => {
                      if (idsFavoriteCharacter.includes(character.id)) {
                        handleFavoriteCharacter(character, "DESFAVORITAR");
                      } else {
                        handleFavoriteCharacter(character, "FAVORITAR");
                      }
                    }}
                  >
                    <Heart
                      size={32}
                      color="#b4211f"
                      weight={
                        idsFavoriteCharacter.includes(character.id)
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

      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "end",
          padding: "50px 25px 25px",
        }}
      >
        <ButtonCSS
          onClick={(e) => {
            e.preventDefault();
            handleChangePrevList();
          }}
          disabled={!characterList.items.info?.prev}
        >
          Previous
        </ButtonCSS>
        <ButtonCSS
          typeCSS="PRIMARY"
          onClick={(e) => {
            e.preventDefault();
            handleChangeNextList();
          }}
          disabled={!characterList.items.info?.next}
        >
          Next
        </ButtonCSS>
      </div>
    </>
  );
}
