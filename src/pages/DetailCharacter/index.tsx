import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ButtonCSS } from "../../components/ButtonCSS";
import { ICharacter } from "../../interfaces/ICharacter";
import { api } from "../../services/api";
import { getFavoriteCharactersId } from "../../store/reducers/favoriteCharacterSlice";
import { ImgDetailCharacter, TextDetailCharacter } from "./styled";

export function DetailCharacter() {
  const { id } = useParams();

  const idsFavoriteCharacterList = useSelector(getFavoriteCharactersId);

  const { data, status } = useQuery<ICharacter, unknown>({
    initialData: undefined,
    queryKey: "single-character",
    queryFn: () => api.get(`/character/${id}`).then((res) => res.data),
  });

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
        <div style={{ padding: 20 }}>
          <ButtonCSS onClick={() => history.go(-1)}>Voltar</ButtonCSS>
        </div>

        <div style={{ textAlign: "center" }}>
          <ImgDetailCharacter src={data?.image} alt={data?.name} />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <TextDetailCharacter>Nome: {data?.name}</TextDetailCharacter>
            <TextDetailCharacter>Genero: {data?.gender}</TextDetailCharacter>
            <TextDetailCharacter>Especie: {data?.species}</TextDetailCharacter>
            <TextDetailCharacter>Status: {data?.status}</TextDetailCharacter>
            <TextDetailCharacter>Tipo: {data?.type}</TextDetailCharacter>
            <TextDetailCharacter>
              Favorito:{" "}
              {idsFavoriteCharacterList.includes(data?.id || -1)
                ? "True"
                : "False"}
            </TextDetailCharacter>
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
