import { createAction } from "@reduxjs/toolkit";

const addCharacters = createAction(
  "CHARACTERS/addCharacters",
  (characters) => ({
    payload: { characters },
  })
);

export const characterAction = { addCharacters };
