import { Characters } from "./components/characters";
import { Filter } from "../../components/Filter";
import { useState } from "react";
import { IFilter } from "../../interfaces/IFilter";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../../store/reducers/characterSlice";
import { api } from "../../services/api";
import { characterAction } from "../../store/actions/characterAction";
import { ICharacter } from "../../interfaces/ICharacter";
import { favoriteCharacterAction } from "../../store/actions/favoriteCharacterAction";
import { Navbar } from "../../components/Navbar";
import logo from "../../assets/rick-and-morty.png";

export function Home() {
  const [pageSelect, setPageSelect] = useState("");
  const [filtro, setFiltro] = useState<IFilter>({
    name: "",
    status: "",
    gender: "",
    species: "",
    type: "",
  });

  const characterList = useSelector(getCharacters);
  const appDispatch = useDispatch();
  const { addCharacters } = characterAction;
  const { addFavoriteCharacter, removeFavoriteCharacter } =
    favoriteCharacterAction;

  const handleChangeNextList = () => {
    if (characterList.items.info?.next) {
      setPageSelect(characterList.items.info.next.slice(42));
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChangePrevList = () => {
    if (characterList.items.info?.prev) {
      setPageSelect(characterList.items.info?.prev.slice(42));
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChangeFilter = async (filtro: IFilter) => {
    const params = new URLSearchParams();

    if (filtro.name) {
      params.append("name", filtro.name);
    }

    if (filtro.status) {
      params.append("status", filtro.status);
    }

    if (filtro.gender) {
      params.append("gender", filtro.gender);
    }

    if (filtro.species) {
      params.append("species", filtro.species);
    }

    if (filtro.type) {
      params.append("type", filtro.type);
    }

    setFiltro(filtro);

    try {
      await api.get(`/character/?${params.toString()}`).then((res) => {
        console.log(res.data);
        appDispatch(addCharacters(res.data));
      });
    } catch (error) {
      throw new Error("Erro na atualização dos personagens pelo filtro:");
    }
  };

  const handleRemoveFilter = () => {
    setFiltro({
      name: "",
      status: "",
      gender: "",
      species: "",
      type: "",
    });

    api.get("/character").then((res) => {
      appDispatch(addCharacters(res.data));
    });
  };

  const handleFavoriteCharacter = (character: ICharacter, action: string) => {
    if (action === "FAVORITAR") {
      appDispatch(addFavoriteCharacter(character));
      return;
    }

    if (action === "DESFAVORITAR") {
      appDispatch(removeFavoriteCharacter(character.id));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Navbar />

      <div style={{ textAlign: "center", paddingTop: 50 }}>
        <img src={logo} style={{ width: "35vh" }} alt="logo" />
      </div>

      <Filter handleChangeFilter={handleChangeFilter} />
      {(filtro.name ||
        filtro.gender ||
        filtro.species ||
        filtro.status ||
        filtro.type) && (
        <button onClick={handleRemoveFilter}>Remover Filtro</button>
      )}

      <div>
        <p style={{ paddingLeft: "2%", color: "#FFFF" }}>
          Filtros Aplicados: {filtro.name && "name"} {filtro.gender && "gender"}{" "}
          {filtro.species && "species"}
          {filtro.status && "status"} {filtro.type && "type"}
        </p>
      </div>

      <Characters
        pageSelect={pageSelect}
        handleChangeNextList={handleChangeNextList}
        handleChangePrevList={handleChangePrevList}
        handleFavoriteCharacter={handleFavoriteCharacter}
      />
    </div>
  );
}
