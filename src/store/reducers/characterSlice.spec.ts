import characterReducer from "./characterSlice";
import { characterAction } from "../actions/characterAction";

describe("Testando reducer de listagem de personagens", () => {
  const state = {
    info: null,
    results: [],
  };

  it("adicionar personagens", () => {
    const initialValue = { items: { info: null, results: [] } };
    const action = characterAction.addCharacters(state);
    const expectedState = { initialValue };

    expect(characterReducer(initialValue, action)).toEqual(expectedState);
  });
});
