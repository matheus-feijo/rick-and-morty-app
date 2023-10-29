import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ICharacter } from "../../interfaces/ICharacter";
import { api } from "../../services/api";
import { getFavoriteCharactersId } from "../../store/reducers/favoriteCharacterSlice";
import {
  ButtonDetailCharacterCSS,
  ImgDetailCharacter,
  TextDetailCharacter,
} from "./styled";
import moment from "moment";
import styles from "./styles.module.css";

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
      <div className={styles["container-loading"]}>
        <p>Carregando...</p>
      </div>
    );
  } else if (status === "success") {
    return (
      <div>
        <div style={{ padding: 20 }}>
          <ButtonDetailCharacterCSS onClick={() => history.go(-1)}>
            Voltar
          </ButtonDetailCharacterCSS>
        </div>

        <div style={{ textAlign: "center" }}>
          <ImgDetailCharacter src={data?.image} alt={data?.name} />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "32vh",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              padding: 5,
            }}
          >
            <TextDetailCharacter>Nome: {data?.name}</TextDetailCharacter>
            <TextDetailCharacter>Genero: {data?.gender}</TextDetailCharacter>
            <TextDetailCharacter>Especie: {data?.species}</TextDetailCharacter>
            <TextDetailCharacter>Status: {data?.status}</TextDetailCharacter>
            <TextDetailCharacter>Tipo: {data?.type}</TextDetailCharacter>
            <TextDetailCharacter>
              Origem: {data?.origin.name}
            </TextDetailCharacter>
            <TextDetailCharacter>
              Criado em: {moment(data.created).locale("pt-br").format("L")}
            </TextDetailCharacter>

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
        <ButtonDetailCharacterCSS onClick={() => history.go(-1)}>
          Voltar
        </ButtonDetailCharacterCSS>
      </div>
    );
  }
}
