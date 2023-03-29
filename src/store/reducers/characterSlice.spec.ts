import characterReducer from "./characterSlice";
import { characterAction } from "../actions/characterAction";

describe("Testando reducer de listagem de personagens", () => {
  const state = {
    info: {
      count: 826,
      pages: 42,
      next: "https://rickandmortyapi.com/api/character/?page=2",
      prev: null,
    },
    results: [
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: {
          name: "Earth",
          url: "https://rickandmortyapi.com/api/location/1",
        },
        location: {
          name: "Earth",
          url: "https://rickandmortyapi.com/api/location/20",
        },
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        episode: [
          "https://rickandmortyapi.com/api/episode/1",
          "https://rickandmortyapi.com/api/episode/2",
          // ...
        ],
        url: "https://rickandmortyapi.com/api/character/1",
        created: "2017-11-04T18:48:46.250Z",
      },
    ],
  };

  it("adicionar personagens", () => {
    const initialValue = { items: { info: null, results: [] } };
    const action = characterAction.addCharacters(state);
    const expectedState = { state };

    expect(characterReducer(initialValue, action)).toEqual(expectedState);
  });
});
