import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ButtonCSS } from "../../components/ButtonCSS";
import { ICharacter } from "../../interfaces/ICharacter";
import { api } from "../../services/api";
import { getFavoriteCharactersId } from "../../store/reducers/favoriteCharacterSlice";
import { useEffect } from "react";

export function DetailCharacter() {
  const { id } = useParams();
  const idsFavoriteCharacterList = useSelector(getFavoriteCharactersId);

  const { data, status, refetch } = useQuery<ICharacter, unknown>({
    initialData: undefined,
    queryKey: "single-character",
    queryFn: () => api.get(`/character/${id}`).then((res) => res.data),
  });

  useEffect(() => {
    refetch();
  }, []);

  if (status === "loading" || status === "idle") {
    return (
      <div
        style={{
          height: "90vh",
          placeItems: "center",
          display: "grid",
          color: "#ffff",
          fontSize: 60,
        }}
      >
        <p>Carregando...</p>
      </div>
    );
  } else if (status === "success") {
    return (
      <div>
        <div style={{ padding: "20px 0px 0px 20px" }}>
          <ButtonCSS onClick={() => history.go(-1)}>Voltar</ButtonCSS>
        </div>

        <div style={{ textAlign: "center" }}>
          <img
            src={data?.image}
            alt={data?.name}
            style={{ border: "10px solid #FFFF", borderRadius: 8 }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ fontSize: 28, color: "#FFFF" }}>
            <p>Nome: {data?.name}</p>
            <p>Genero: {data?.gender}</p>
            <p>Especie: {data?.species}</p>
            <p>Status: {data?.status}</p>
            <p>Tipo: {data?.type}</p>
            <p>
              Favorito:{" "}
              {idsFavoriteCharacterList.includes(data?.id || -1)
                ? "True"
                : "False"}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ padding: "20px 0px 0px 20px" }}>
        <ButtonCSS onClick={() => history.go(-1)}> Voltar</ButtonCSS>
      </div>
    );
  }
}
