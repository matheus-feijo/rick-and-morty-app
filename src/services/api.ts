import axios from "axios";
import { IResponseCharacter } from "../interfaces/IResponseCharacter";
import { ICharacter } from "../interfaces/ICharacter";

export const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export const apiService = {
  getAllCharacter: async (params: string) => {
    const { data }: { data: IResponseCharacter } = await api.get(
      `/character?${params}`
    );
    return data;
  },

  getUniqueCharacter: async (id: number) => {
    const { data }: { data: ICharacter } = await api.get(`/character/${id}`);

    return data;
  },
};
