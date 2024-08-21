import { Client } from "../../../types/client";
import { privateAxios } from "../../axios";
import { paths } from "../../paths";

export const getClients = async (): Promise<Client[] | null> => {
  try {
    const { data } = await privateAxios.get(`${paths.base}/clients`);
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
