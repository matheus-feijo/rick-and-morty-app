import { createSlice } from "@reduxjs/toolkit";
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
