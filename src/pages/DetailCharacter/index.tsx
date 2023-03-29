import { ArrowLeft } from "@phosphor-icons/react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { ICharacter } from "../../interfaces/ICharacter";
import { api } from "../../services/api";

export function DetailCharacter() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, status } = useQuery<ICharacter, unknown>({
    queryKey: "single-character",
    queryFn: () => api.get(`/character/${id}`).then((res) => res.data),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (status === "error") {
    return <button> Voltar</button>;
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
          onClick={() => navigate("/")}
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
        <div style={{ fontSize: 28 }}>
          <p>Name: {data?.name}</p>
          <p>Gender: {data?.gender}</p>
          <p>Species: {data?.species}</p>
          <p>Status: {data?.status}</p>
          <p>Type: {data?.type}</p>
        </div>
      </div>
    </div>
  );
}
