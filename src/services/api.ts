import axios from "axios";
import { IResponseCharacter } from "../interfaces/IResponseCharacter";

export const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export const apiService = {
  getAllCharacter: async (page: number) => {
    const { data }: { data: IResponseCharacter } = await api.get(
      `/character?page=${page}`
    );
    return data;
  },
};
