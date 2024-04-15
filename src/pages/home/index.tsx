import { useQuery } from "react-query";
import logo from "../../assets/rick-and-morty.png";
import { apiService } from "../../services/api";
import { Divider, Pagination, Result, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNotify } from "../../hooks/useNotify";
import { useCharacter } from "../../hooks/useCharacter";
import { ICharacter } from "../../interfaces/ICharacter";
import { useEffect, useState } from "react";
import { Filtro } from "./components/Filtro";
import styles from "./styles.module.css";
import { CardCharacter } from "../../components/CardCharacter";

export function Home() {
  const { contextholderNotification, openNotification } = useNotify();
  const {
    adicionarPersonagens,
    personagens,
    favoritarPersonagem,
    removerFavorito,
    personagensFavoritos,
  } = useCharacter();

  const [params, setParams] = useState("");
  const [pageSelected, setPageSelected] = useState(1);

  const {
    data: characters,
    refetch,
    isLoading,
    isFetched,
    isSuccess,
    isError,
    isRefetching,
  } = useQuery({
    queryFn: () => apiService.getAllCharacter(params),
    queryKey: ["CHARACTER_ALL"],
    onSuccess: (data) => {
      // console.log(data);
      adicionarPersonagens(data);
    },
  });

  const handleChangeFavorite = (character: ICharacter) => {
    //DESFAVORITAR AO CLICAR EM PERSONAGEM JA FAVORITADO
    if (personagensFavoritos.find((value) => value.id === character.id)) {
      removerFavorito(character.id);
      openNotification({
        type: "success",
        message: `Personagem ${character.name} Removido dos favoritos com sucesso!`,
      });
      return;
    }

    favoritarPersonagem(character);
    //

    openNotification({
      type: "success",
      message: `Personagem ${character.name} favoritado com sucesso!`,
    });
  };

  const handleChangePage = (page: number, pageSize: number) => {
    //VERIFICAR SE É ANTERIOR OU PROXIMA PAGINA
    const newParams = new URLSearchParams(params);
    newParams.delete("page");
    newParams.append("page", page.toString());

    setParams(newParams.toString());
    localStorage.setItem("page", page.toString());

    setPageSelected(page);
  };

  useEffect(() => {
    // console.log("opa");
    refetch();
  }, [params]);

  return (
    <>
      {contextholderNotification}
      <div className={styles.container}>
        <img src={logo} className={styles["imagem-titulo"]} />

        <Divider style={{ backgroundColor: "#FFFF", opacity: 0.2 }} />

        <div style={{ width: "100%", paddingLeft: 20 }}>
          <Filtro
            setParams={setParams}
            params={params}
            restartPageSelected={() => {
              setPageSelected(1);
            }}
          />
        </div>

        <div>
          {isError && !(isLoading || isRefetching) && (
            <Result
              status="error"
              title="Não foi possivel listar Personagens"
              subTitle="Por favor tente novamente mais tarde"
            />
          )}

          {(isLoading || isRefetching) && (
            <div
              style={{
                minHeight: "40vh",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 96 }} spin />}
              />
            </div>
          )}

          {isSuccess && !isRefetching && (
            <div className={styles["container-success"]}>
              {isFetched && !isError && (
                <div className={styles["container-content-card"]}>
                  {personagens.items.results.map((character) => {
                    return (
                      <CardCharacter
                        key={character.id}
                        character={character}
                        favoritesCharacters={personagensFavoritos}
                        handleChange={handleChangeFavorite}
                      />
                    );
                  })}
                </div>
              )}

              <div
                style={{
                  padding: 20,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  style={{ color: "#FFFF" }}
                  current={pageSelected}
                  size="default"
                  pageSize={20}
                  total={personagens.items.info?.count}
                  onChange={handleChangePage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
