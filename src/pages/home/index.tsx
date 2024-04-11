import { useQuery } from "react-query";
import logo from "../../assets/rick-and-morty.png";
import { apiService } from "../../services/api";
import { Button, Card, Pagination, Result, Spin } from "antd";
import { HeartOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNotify } from "../../hooks/useNotify";
import { useCharacter } from "../../hooks/useCharacter";
import { ICharacter } from "../../interfaces/ICharacter";
import { Heart } from "@phosphor-icons/react";
import { ButtonCSS } from "../../components/ButtonCSS";
import { useEffect, useState } from "react";

export function Home() {
  const { contextholderNotification, openNotification } = useNotify();
  const {
    adicionarPersonagens,
    personagens,
    favoritarPersonagem,
    removerFavorito,
    personagensFavoritos,
  } = useCharacter();

  const [pageSelected, setPageSelected] = useState(1);

  const {
    data: characters,
    status,
    refetch,
  } = useQuery({
    queryFn: () => apiService.getAllCharacter(pageSelected),
    queryKey: ["CHARACTER_ALL"],
    onSuccess: (data) => {
      console.log(data);
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
    setPageSelected(page);
    localStorage.setItem("page", page.toString());
  };

  useEffect(() => {
    refetch();
  }, [pageSelected]);

  return (
    <>
      {contextholderNotification}
      <div
        style={{
          padding: 20,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 20,
          height: "90vh",
        }}
      >
        <img
          src={logo}
          style={{
            width: 350,
            height: 100,
          }}
        />

        <div>
          {status === "loading" && (
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

          {status === "error" && (
            <Result
              status="error"
              title="Erro ao Listar Personagens"
              subTitle="Por favor tente novamente mais tarde"
            />
          )}

          {status === "success" && (
            <div style={{ paddingBottom: 40, paddingLeft: 40 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                {personagens.items.results.map((character) => {
                  return (
                    <Card
                      key={character.id}
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt={character.name} src={character.image} />}
                    >
                      <Card.Meta
                        title={character.name}
                        description={
                          <ButtonCSS
                            onClick={() => handleChangeFavorite(character)}
                          >
                            <Heart
                              size={32}
                              color="#b4211f"
                              weight={
                                personagensFavoritos.find(
                                  (value) => value.id === character.id
                                )
                                  ? "fill"
                                  : "regular"
                              }
                            />
                          </ButtonCSS>
                        }
                      />
                    </Card>
                  );
                })}
              </div>

              <div
                style={{
                  padding: 20,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pagination
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
