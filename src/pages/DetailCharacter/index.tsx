import { ArrowLeft } from "@phosphor-icons/react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { ICharacter } from "../../interfaces/ICharacter";
import { api } from "../../services/api";
import { getFavoriteCharactersId } from "../../store/reducers/favoriteCharacterSlice";

export function DetailCharacter() {
  const { id } = useParams();
  const idsFavoriteCharacterList = useSelector(getFavoriteCharactersId);

  const { data, status } = useQuery<ICharacter, unknown>({
    queryKey: "single-character",
    queryFn: () => api.get(`/character/${id}`).then((res) => res.data),
  });

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (status === "error") {
    return (
      <div style={{ padding: "20px 0px 0px 20px" }}>
        <Navbar />
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
          onClick={() => history.go(-1)}
        >
          {" "}
          <ArrowLeft size={32} /> Voltar
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px 0px 0px 20px" }}>
        {" "}
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
          onClick={() => history.go(-1)}
        >
          {" "}
          <ArrowLeft size={32} /> Voltar
        </button>
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
          <p>Name: {data?.name}</p>
          <p>Gender: {data?.gender}</p>
          <p>Species: {data?.species}</p>
          <p>Status: {data?.status}</p>
          <p>Type: {data?.type}</p>
          <p>
            Favorited:{" "}
            {idsFavoriteCharacterList.includes(data?.id || -1)
              ? "True"
              : "False"}
          </p>
        </div>
      </div>
    </div>
  );
}
