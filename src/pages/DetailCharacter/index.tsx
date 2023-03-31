import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ButtonCSS } from "../../components/ButtonCSS";
import { ICharacter } from "../../interfaces/ICharacter";
import { api } from "../../services/api";
import { getFavoriteCharactersId } from "../../store/reducers/favoriteCharacterSlice";

export function DetailCharacter() {
  const { id } = useParams();
  const idsFavoriteCharacterList = useSelector(getFavoriteCharactersId);

  const { data, status } = useQuery<ICharacter, unknown>({
    initialData: undefined,
    queryKey: "single-character",
    queryFn: () => api.get(`/character/${id}`).then((res) => res.data),
  });

  if (status === "loading") {
    return (
      <div style={{ padding: "20px 0px 0px 20px" }}>
        <p>Carregando...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={{ padding: "20px 0px 0px 20px" }}>
        <ButtonCSS onClick={() => history.go(-1)}> Voltar</ButtonCSS>
      </div>
    );
  }

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
}
