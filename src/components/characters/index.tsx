import { useQuery } from "react-query";
import { ICharacter } from "../../interfaces/ICharacter";
import { IDadosCharacters } from "../../interfaces/IDadosCharacters";
import { api } from "../../services/api";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../../store/reducers/characterSlice";
import { characterAction } from "../../store/actions/characterAction";

interface ICharacterAPI {
  info: IDadosCharacters;
  results: ICharacter[];
}

export function Characters({
  pageSelect,
  handleChangeNextList,
  handleChangePrevList,
}: {
  pageSelect: string;
  handleChangeNextList: () => void;
  handleChangePrevList: () => void;
}) {
  const appDispatch = useDispatch();
  const characterList = useSelector(getCharacters);
  const { addCharacters } = characterAction;

  const { status, data, refetch } = useQuery<ICharacterAPI, unknown>({
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
    return <p>cARREGANDO</p>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        {characterList.items.results.map((character) => {
          return (
            <div
              key={character.id}
              style={{ display: "flex", flexDirection: "column", gap: 5 }}
            >
              <button
                style={{
                  width: 100,
                  height: 100,
                  padding: 5,
                  cursor: "pointer",
                }}
              >
                {character.name}
              </button>
              <button>Favoritar</button>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "end",
          padding: "50px 50px 0px 0px",
        }}
      >
        <button
          onClick={handleChangePrevList}
          style={{
            width: 100,
            height: 35,
            padding: 5,
            cursor: "pointer",
          }}
        >
          Previous
        </button>
        <button
          onClick={handleChangeNextList}
          style={{
            width: 100,
            height: 35,
            padding: 5,
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
