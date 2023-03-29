import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#FFFF",
        width: "100%",
        height: "5vh",
        justifyContent: "space-around",
        alignItems: "center",
        display: "flex",
      }}
    >
      <button onClick={() => navigate("/favorites")}>Favoritos</button>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}
