/**
 * @jest-environment jsdom
 */
import { render, fireEvent } from "@testing-library/react";
import { it, describe } from "vitest";
import { Filter } from ".";
import { IFilter } from "../../interfaces/IFilter";

describe("Filtro de personagens", () => {
  const handleChangeFilter = (filtro: IFilter) => {};
  const { container, getByText } = render(
    <Filter handleChangeFilter={handleChangeFilter} />
  );

  it("Abrir filtro", () => {
    const buttonFiltro = container.querySelector("#filtro");
    if (buttonFiltro) {
      fireEvent.click(buttonFiltro);
      console.log(getByText("Aplicar filtro"));
    }
  });

  it("Aplicar filtro", () => {});
});
