import { choreChart } from "./choreChartApi";
import { basePath } from "../config";

export type termInformation = {
  id: number;
  numberOfChoresPerNormalPerson: number;
  numberOfChoresPerGreenTeam: number;
  active: boolean;
  name: string;
};

export const getTermInformations = async (): Promise<termInformation[]> => {
  const axios = require("axios").default;
  return await axios
    .get(`${basePath}/api/termInformations?projection=withTermInformation`)
    .then((data: any) => {
      return data.data._embedded.termInformations;
    });
};
export const postTermInformation = async (
  termInformation: termInformation
): Promise<termInformation> => {
  const axios = require("axios").default;
  return await axios
    .post(`${basePath}/api/termInformations`, termInformation)
    .then((data: any) => {
      return data.data;
    });
};

export const postUpdateTermInfoActive = async (
  id: number
): Promise<termInformation[]> => {
  const axios = require("axios").default;
  return await axios
    .post(`${basePath}/api/termInformations/update-term-actice/${id}`)
    .then((data: any) => {
      return data.data;
    });
};
export const getCurrentTermInfo = async (): Promise<termInformation> => {
  const axios = require("axios").default;
  return await axios
    .get(
      `${basePath}/api/termInformations/search/findByActive?active=true&projection=withTermInformation`
    )
    .then((data: any) => {
      console.log(data);
      return data.data;
    });
};
