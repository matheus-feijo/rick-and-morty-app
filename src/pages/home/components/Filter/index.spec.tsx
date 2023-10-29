/**
 * @jest-environment jsdom
 */
import { render, fireEvent } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import { Filter } from ".";
import { IFilter } from "../../../../interfaces/IFilter";

describe("Filtro de personagens", () => {
  let objFiltro = {};

  const handleChangeFilter = (filtro: IFilter) => {
    objFiltro = filtro;
  };

  it("Abrir filtro", () => {
    const { container, getByText } = render(
      <Filter handleChangeFilter={handleChangeFilter} />
    );
    const buttonFiltro = container.querySelector("#filtro");

    if (buttonFiltro) {
      fireEvent.click(buttonFiltro);
    }

    expect(getByText("Aplicar filtro")).toBeInTheDocument();
    // debug();
  });

  it("Aplicar filtro retornando dados do filtro", () => {
    const { container, getByText, getByTestId } = render(
      <Filter handleChangeFilter={handleChangeFilter} />
    );
    const buttonFiltro = container.querySelector("#filtro");

    if (buttonFiltro) {
      fireEvent.click(buttonFiltro);
    }

    const buttonAplicarFiltro = getByText("Aplicar filtro");
    const inputName = getByTestId("name-test");

    if (inputName) {
      fireEvent.change(inputName, { target: { value: "rick" } });
    }

    if (buttonAplicarFiltro) {
      fireEvent.click(buttonAplicarFiltro);
    }

    // debug();

    afterAll(() => {
      expect(objFiltro).toEqual({
        gender: "",
        name: "rick",
        species: "",
        status: "",
        type: "",
      });
    });
  });
});
