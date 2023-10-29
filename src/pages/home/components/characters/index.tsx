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
import { CardCSS } from "../../../../components/CardCSS";
import { ImageCharacter } from "../../../../components/ImageCharacter";
import { ContainerCards } from "../../../../components/ContainerCards";
import { TextCard } from "../../../../components/TextCard";
import { ButtonListCharacterCSS } from "./styled";
import styles from "./style.module.css";
import { Spin } from "antd";
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

  if (status === "loading" || status === "idle") {
    return (
      <div className={styles["container-loading"]}>
        <Spin />
      </div>
    );
  } else if (status === "success") {
    return (
      <>
        <div className={styles["cotnainer"]}>
          {characterList.items.results.map((character) => {
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
                </CardCSS>
              </ContainerCards>
            );
          })}
        </div>

        <div className={styles["pagina-numeration"]}>
          <span>
            Page {pageSelect.split("=")[1] || 1}/
            {characterList.items.info?.pages}
          </span>
        </div>

        <div className={styles["container-change-page"]}>
          <ButtonListCharacterCSS
            onClick={(e) => {
              e.preventDefault();
              handleChangePrevList();
            }}
            disabled={!characterList.items.info?.prev}
          >
            Previous
          </ButtonListCharacterCSS>

          <ButtonListCharacterCSS
            onClick={(e) => {
              e.preventDefault();
              handleChangeNextList();
            }}
            disabled={!characterList.items.info?.next}
          >
            Next
          </ButtonListCharacterCSS>
        </div>
      </>
    );
  } else {
    return (
      <div className={styles["container-error"]}>
        <span>Erro ao carregar Lista de Personagens</span>
      </div>
    );
  }
}
