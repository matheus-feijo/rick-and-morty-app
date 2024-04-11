import { ICharacter } from "./ICharacter";
import { IDadosCharacters } from "./IDadosCharacters";

export interface IResponseCharacter {
  info: IDadosCharacters | null;

  results: ICharacter[];
}
