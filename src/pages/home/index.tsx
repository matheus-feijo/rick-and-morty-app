import { Characters } from "../../components/characters";
import { Filter } from "../../components/Filter";
import { useState } from "react";
import { IFilter } from "../../interfaces/IFilter";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../../store/reducers/characterSlice";
import { api } from "../../services/api";
import { characterAction } from "../../store/actions/characterAction";

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

  const handleChangeNextList = () => {
    if (characterList.items.info?.next) {
      setPageSelect(characterList.items.info.next.slice(42));
    }
  };

  const handleChangePrevList = () => {
    if (characterList.items.info?.prev) {
      setPageSelect(characterList.items.info?.prev.slice(42));
    }
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
    setPageSelect("");
    setFiltro({
      name: "",
      status: "",
      gender: "",
      species: "",
      type: "",
    });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "rgba(59,201,217,0.7)",
      }}
    >
      <Filter
        handleChangeFilter={handleChangeFilter}
        handleRemoveFilter={handleRemoveFilter}
        filtro={filtro}
      />
      <Characters
        pageSelect={pageSelect}
        handleChangeNextList={handleChangeNextList}
        handleChangePrevList={handleChangePrevList}
      />
    </div>
  );
}
