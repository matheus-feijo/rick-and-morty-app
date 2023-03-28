import { useState } from "react";
import { IFilter } from "../../interfaces/IFilter";

export function Filter({
  handleChangeFilter,
  handleRemoveFilter,
  filtro,
}: {
  handleChangeFilter: (filtro: IFilter) => void;
  handleRemoveFilter: () => void;
  filtro: IFilter;
}) {
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [specieFilter, setSpecieFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const handleChangeStatus = (e: any) => {
    setStatusFilter(e.target.value);
  };

  const handleChangeGender = (e: any) => {
    setGenderFilter(e.target.value);
  };

  return (
    <div>
      <div>FILTRO</div>
      <div>
        <p>Buscar pelo nome</p>
        <input
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />

        <p>Buscar pelo Status</p>
        <div onChange={(e) => console.log(e)}>
          <input
            type="radio"
            value="alive"
            name="status"
            onChange={handleChangeStatus}
          />{" "}
          Alive
          <input
            type="radio"
            value="dead"
            name="status"
            onChange={handleChangeStatus}
          />{" "}
          Dead
          <input
            type="radio"
            value="unknown"
            name="status"
            onChange={handleChangeStatus}
          />{" "}
          Unknown
        </div>
        <p>Buscar pela Especie</p>
        <input
          value={specieFilter}
          onChange={(e) => setSpecieFilter(e.target.value)}
        />

        <p>Buscar pelo tipo</p>
        <input
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        />

        <p>Buscar pelo Genero</p>
        <div>
          <input
            type="radio"
            value="female"
            name="gender"
            onChange={handleChangeGender}
          />{" "}
          Female
          <input
            type="radio"
            value="male"
            name="gender"
            onChange={handleChangeGender}
          />{" "}
          Male
          <input
            type="radio"
            value="genderless"
            name="gender"
            onChange={handleChangeGender}
          />{" "}
          Genderless
          <input
            type="radio"
            value="unknown"
            name="gender"
            onChange={handleChangeGender}
          />{" "}
          Unknown
        </div>

        <button
          onClick={() =>
            handleChangeFilter({
              name: nameFilter,
              status: statusFilter,
              species: specieFilter,
              gender: genderFilter,
              type: typeFilter,
            })
          }
        >
          Buscar
        </button>

        {(filtro.name ||
          filtro.gender ||
          filtro.species ||
          filtro.status ||
          filtro.type) && (
          <button onClick={handleRemoveFilter}>Remover Filtro</button>
        )}

        <div>
          <p>
            Filtros Aplicados: {filtro.name && "name"}{" "}
            {filtro.gender && "gender"} {filtro.species && "species"}
            {filtro.status && "status"} {filtro.type && "type"}
          </p>
        </div>
      </div>
    </div>
  );
}
