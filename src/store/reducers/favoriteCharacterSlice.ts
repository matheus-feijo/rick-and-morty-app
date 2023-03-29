import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ICharacter } from "../../interfaces/ICharacter";

interface IFavoriteCharacterSlice {
  items: ICharacter[];
}

const initialState: IFavoriteCharacterSlice = {
  items: [],
};

const favoriteCharacterSlice = createSlice({
  name: "FAVORITE_CHARACTER",
  initialState,
  reducers: {
    addFavoriteCharacter: (state, action) => {
      const { character } = action.payload;

      state.items.push(character);
    },
    removeFavoriteCharacter: (state, action) => {
      const { idCharacter } = action.payload;

      const itemsFilter = state.items.filter((item) => item.id !== idCharacter);

      state.items = itemsFilter;
    },
  },
});

export default favoriteCharacterSlice.reducer;

export const getFavoriteCharactersId = (state: RootState) => {
  const ids = state.favoriteCharacters.items.map((character) => character.id);

  return ids;
};

export const getAllFavoriteCharacters = (state: RootState) =>
  state.favoriteCharacters.items;
