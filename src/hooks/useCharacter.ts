import { useDispatch, useSelector } from "react-redux";
import { characterAction } from "../store/actions/characterAction";
import { getCharacters } from "../store/reducers/characterSlice";
import { IResponseCharacter } from "../interfaces/IResponseCharacter";
import { favoriteCharacterAction } from "../store/actions/favoriteCharacterAction";
import { ICharacter } from "../interfaces/ICharacter";
import {
  getAllFavoriteCharacters,
  getFavoriteCharactersId,
} from "../store/reducers/favoriteCharacterSlice";

export const useCharacter = () => {
  const { addCharacters } = characterAction;
  const { addFavoriteCharacter, removeFavoriteCharacter } =
    favoriteCharacterAction;
  const appDispatch = useDispatch();
  const personagens = useSelector(getCharacters);
  const personagensFavoritos = useSelector(getAllFavoriteCharacters);

  const adicionarPersonagens = (characters: IResponseCharacter) => {
    appDispatch(addCharacters(characters));
  };

  const favoritarPersonagem = (character: ICharacter) => {
    appDispatch(addFavoriteCharacter(character));
  };

  const removerFavorito = (id: number) => {
    appDispatch(removeFavoriteCharacter(id));
  };

  return {
    adicionarPersonagens,
    personagens,
    favoritarPersonagem,
    removerFavorito,
    personagensFavoritos,
  };
};
