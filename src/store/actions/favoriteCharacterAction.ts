import { createAction } from "@reduxjs/toolkit";

const addFavoriteCharacter = createAction(
  "FAVORITE_CHARACTER/addFavoriteCharacter",
  (character) => ({
    payload: { character },
  })
);

const removeFavoriteCharacter = createAction(
  "FAVORITE_CHARACTER/removeFavoriteCharacter",
  (idCharacter) => ({
    payload: { idCharacter },
  })
);

export const favoriteCharacterAction = {
  addFavoriteCharacter,
  removeFavoriteCharacter,
};
