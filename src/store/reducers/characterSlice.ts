import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ICharacter } from "../../interfaces/ICharacter";
import { IDadosCharacters } from "../../interfaces/IDadosCharacters";

interface ICharacterSlice {
  items: {
    info: IDadosCharacters | null;
    results: ICharacter[];
  };
}

const initialState: ICharacterSlice = {
  items: { info: null, results: [] },
};

const characterSlice = createSlice({
  name: "CHARACTERS",
  initialState,
  reducers: {
    addCharacters: (state, action) => {
      const { characters } = action.payload;
      state.items = characters;
    },
  },
});

export default characterSlice.reducer;

export const getCharacters = (state: RootState) => state.characters;
