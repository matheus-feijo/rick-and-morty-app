import axios from "axios";
import { IResponseCharacter } from "../interfaces/IResponseCharacter";

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
};
